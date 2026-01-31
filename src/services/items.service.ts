import { prisma } from '../prisma';
import { parseCsv } from '../utils/csvImporter';

export const getAll = () => prisma.item.findMany();

export const create = (data: { name: string, quantity: number }) => 
  prisma.item.create({ data })

export const update = (id: number, data: any) => 
  prisma.item.update({ where: { id }, data })

export const remove = (id: number) => 
  prisma.item.delete({ where: {id} })

export const importFromCsv = async (filePath: string) => {
  const rows = await parseCsv(filePath);

  await prisma.item.createMany({
    data: rows.map(r => ({
      name: r.name,
      quantity: Number(r.quantity)
    }))
  })

  return rows.length;
}