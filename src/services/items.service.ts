import { prisma } from '../prisma';
import { parseCsv } from '../utils/csvImporter';

type CustomerCsv = {
  'Customer Id': string,
  'First Name': string,
  'Last Name': string,
  'Company': string
  'City': string,
  'Country': string,
  'Phone 1': string,
  'Phone 2': string,
  'Email': string,
  'Subscription Date': string,
  'Website': string,
}

export const getAll = () => prisma.item.findMany();

export const create = (data: {
    customerId: string,
    firstName: string,
    lastName: string,
    company: string,
    city: string,
    country: string,
    phone1: string,
    phone2: string,
    email: string,
    subscriptionDate: string,
    website: string
  }) => {
    const { subscriptionDate } = data;
    const datedDate = new Date(subscriptionDate);
    if (isNaN(datedDate.getTime())) {
      throw new Error('Invalid date value sent for creation')
    }
    return prisma.item.create({ data: { ...data, subscriptionDate: datedDate }})
  }

export const update = (id: number, data: any) => 
  prisma.item.update({ where: { id }, data })

export const remove = (id: number) => 
  prisma.item.delete({ where: {id} })

export const importFromCsv = async (filePath: string) => {
  const rows = await parseCsv(filePath) as CustomerCsv[];

  await prisma.item.createMany({
    data: rows.map(r => ({
      customerId: r['Customer Id'],
      firstName: r['First Name'],
      lastName: r['Last Name'],
      company: r['Company'],
      city: r['City'], 
      country: r['Country'],       
      phone1: r['Phone 1'], 
      phone2: r['Phone 2'],   
      email: r['Email'],  
      subscriptionDate: new Date(r['Subscription Date']),
      website: r['Website']
    }))
  });

  //  for default test data
  // await prisma.item.createMany({
  //   data: rows.map(r => ({
  //     name: r.name,
  //     quantity: Number(r.quantity)
  //   }))
  // })

  return rows.length;
}