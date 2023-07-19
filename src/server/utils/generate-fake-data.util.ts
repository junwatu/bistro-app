import { Prisma } from '@prisma/client';
import { prisma } from 'server/db';

export async function generateFakeDataUtil(overrides: any) {
  try {
    const payload = {
      models: Prisma.dmmf.datamodel.models,
      count: 5,
      overrides,
    };
    const response = await fetch('https://roq-faker.onrender.com/faker', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    const overridesKeys = Object.keys(overrides);
    const seedEntries = Object.entries(data).filter(([key]) => !overridesKeys.includes(key));
    for (const [model, values] of seedEntries) {
      // @ts-ignore
      await prisma[model].createMany({
        data: values,
      });
    }
  } catch (err) {
    console.log('unable to generate seed data: ', err);
  }
}
