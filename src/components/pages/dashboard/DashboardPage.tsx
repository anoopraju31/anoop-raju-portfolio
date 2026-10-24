'use client';

import { useCallback, useEffect, useMemo, useState, type FC } from 'react';
import axios from 'axios';
import { subHours } from 'date-fns';
import { toast } from 'sonner';

import useAppSelector from '@/hooks/useAppSelector';
import type { ContactMessageItem } from '../../../../types';
import MessageDetailModal from '@/components/pages/contactEnquire/MessageDetailModal';
import { client as sanityClient } from '@/sanity/lib/client';

import DashboardHeader from './DashboardHeader';
import DashboardStats from './DashboardStats';
import RecentContactInquires from './RecentContactInquires';
import QuickOperations from './QuickOperations';
import SystemSpecifications from './SystemSpecifications';

const DashboardPage: FC = () => {
  const { user } = useAppSelector((state) => state.userAuth);

  const [messages, setMessages] = useState<ContactMessageItem[]>([]);
  const [blogCount, setBlogCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessageItem | null>(null);

  const fetchDashboardTelemetry = useCallback(async (isManual = false) => {
    if (isManual) setIsRefreshing(true);
    else setIsLoading(true);

    try {
      // 1. Fetch Contact Inquiries
      const contactPromise = axios
        .get<ContactMessageItem[] | { data: ContactMessageItem[] }>(
          '/v1/users/contact-enquire',
          { withCredentials: true }
        )
        .then((res) => {
          const items: ContactMessageItem[] = Array.isArray(res.data)
            ? res.data
            : Array.isArray(res.data?.data)
              ? res.data.data
              : [];
          setMessages(items);
        })
        .catch((err) => {
          console.error('Error fetching contact inquiries for telemetry:', err);
        });

      // 2. Fetch Blog Count from Sanity
      const sanityPromise = sanityClient
        .fetch<number>('count(*[_type == "post"])')
        .then((count) => {
          setBlogCount(count);
        })
        .catch((err) => {
          console.error('Error fetching Sanity blog count:', err);
          setBlogCount(null);
        });

      await Promise.allSettled([contactPromise, sanityPromise]);

      if (isManual) {
        toast.success('Telemetry Refreshed', {
          description: 'Dashboard metrics have been synchronized.',
        });
      }
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardTelemetry();
  }, [fetchDashboardTelemetry]);

  // Compute metrics
  const recentMessagesCount = useMemo(() => {
    const fortyEightHoursAgo = subHours(new Date(), 48);
    return messages.filter((m) => {
      const date = new Date(m.createdAt);
      return !isNaN(date.getTime()) && date >= fortyEightHoursAgo;
    }).length;
  }, [messages]);

  const recentFiveMessages = useMemo(() => {
    return messages.slice(0, 5);
  }, [messages]);

  return (
    <div className="flex flex-col gap-8 pb-8">
      {/* 1. Dashboard Header */}
      <DashboardHeader
        userName={user?.firstName || 'Anoop'}
        isLoading={isLoading}
        isRefreshing={isRefreshing}
        onRefresh={() => fetchDashboardTelemetry(true)}
      />

      {/* 2. Statistics Grid */}
      <DashboardStats
        totalInquiries={messages.length}
        recentMessagesCount={recentMessagesCount}
        blogCount={blogCount}
        isLoading={isLoading}
        user={user}
      />

      {/* 3. Main Content Split: Recent Activity & Quick Shortcuts */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column (2 Cols): Recent Inquiries Preview */}
        <RecentContactInquires
          messages={recentFiveMessages}
          totalCount={messages.length}
          isLoading={isLoading}
          onSelectMessage={(msg) => setSelectedMessage(msg)}
        />

        {/* Right Column (1 Col): Operations & Telemetry Specs */}
        <div className="flex flex-col gap-6">
          <QuickOperations />
          <SystemSpecifications />
        </div>
      </div>

      {/* 4. Message Inspection Modal */}
      {selectedMessage && (
        <MessageDetailModal
          message={selectedMessage}
          onClose={() => setSelectedMessage(null)}
        />
      )}
    </div>
  );
};

export default DashboardPage;
