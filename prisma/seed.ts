import { loadEnvConfig } from '@next/env';
loadEnvConfig(process.cwd());

import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = (process.env.ADMIN_EMAIL || 'anoopraju31@gmail.com').trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD || 'Admin@12345';
  const firstName = process.env.ADMIN_FIRST_NAME || 'Anoop';
  const lastName = process.env.ADMIN_LAST_NAME || 'Raju';

  console.log(`Seeding admin user for ${email}...`);

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    const updated = await prisma.user.update({
      where: { email },
      data: {
        firstName,
        lastName,
        role: Role.ADMIN,
        password: hashedPassword,
      },
    });
    console.log(`Updated existing admin user: ${updated.email} (ID: ${updated.id})`);
  } else {
    const created = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        role: Role.ADMIN,
        password: hashedPassword,
      },
    });
    console.log(`Created new admin user: ${created.email} (ID: ${created.id})`);
  }

  console.log('\n--- Admin Credentials ---');
  console.log(`Email:    ${email}`);
  console.log(`Password: ${password}`);
  console.log('-------------------------\n');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
