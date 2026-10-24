import { toast } from 'sonner';
import { FiCheckCircle, FiAlertCircle, FiX } from 'react-icons/fi';

export const showSuccessToast = (message: string, title = 'Message Delivered') => {
  toast.custom((t) => (
    <div className="relative flex w-full max-w-md items-start gap-3.5 rounded-2xl border border-light-green/40 bg-[#090e16]/95 p-4 text-white shadow-[0_12px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(76,252,15,0.15)] backdrop-blur-xl transition-all">
      <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border border-light-green/30 bg-light-green/10 text-light-green shadow-[0_0_12px_rgba(76,252,15,0.3)]">
        <FiCheckCircle size={18} />
      </div>

      <div className="flex-1 pr-2">
        <h4 className="font-sans text-sm font-bold tracking-tight text-white">{title}</h4>
        <p className="mt-1 font-sans text-xs leading-relaxed text-white/70">{message}</p>
      </div>

      <button
        type="button"
        onClick={() => toast.dismiss(t)}
        className="rounded-lg p-1 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
        aria-label="Close notification"
      >
        <FiX size={15} />
      </button>
    </div>
  ));
};

export const showErrorToast = (message: string, title = 'Action Required') => {
  toast.custom((t) => (
    <div className="relative flex w-full max-w-md items-start gap-3.5 rounded-2xl border border-red-500/40 bg-[#090e16]/95 p-4 text-white shadow-[0_12px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(239,68,68,0.15)] backdrop-blur-xl transition-all">
      <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 shadow-[0_0_12px_rgba(239,68,68,0.3)]">
        <FiAlertCircle size={18} />
      </div>

      <div className="flex-1 pr-2">
        <h4 className="font-sans text-sm font-bold tracking-tight text-white">{title}</h4>
        <p className="mt-1 font-sans text-xs leading-relaxed text-white/70">{message}</p>
      </div>

      <button
        type="button"
        onClick={() => toast.dismiss(t)}
        className="rounded-lg p-1 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
        aria-label="Close notification"
      >
        <FiX size={15} />
      </button>
    </div>
  ));
};
