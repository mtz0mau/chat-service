import dotenv from 'dotenv';
import prisma from '../database/prisma.js';
dotenv.config();

export const PORT = process.env.SERVER_PORT || 3004;

export let corsOptions = {
  origin: [],
  methods: ["GET", "POST"],
  credentials: true
};

const getAllowedDomains = async () => {
  const apps = await prisma.app.findMany();
  const urls = apps.map(app => {
    const urls = app.urls.split(',');
    return urls.map(url => url.trim());
  });
  return urls.flat();
};

export const updateAllowedDomains = async () => {
  console.log('Updating allowed domains...')
  const urls = await getAllowedDomains();
  corsOptions.origin = urls;
};
