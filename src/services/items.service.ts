import { prisma } from '../prisma';
import { parseCsv } from '../utils/csvImporter';


type StudenCsv = {
  Name: string;
  Age?: number;
  DateOfBirth: string;
  Score?: number;
  Active?: string;
  Description?: string;
  JoinDate: string;
}

export const getAll = () => prisma.item.findMany();

export const getById = (id: number) =>
  prisma.item.findFirstOrThrow({where: {id}})

export const create = (data: { name: string, age?: number, dateOfBirth?: string, score?: number, active?: boolean, description?: string, joinDate?: string }) => 
  prisma.item.create({ data })

export const update = (id: number, data: any) => 
  prisma.item.update({ where: { id }, data })

export const remove = (id: number) => 
  prisma.item.delete({ where: {id} })

export const importFromCsv = async (filePath: string) => {
  const rows = await parseCsv(filePath) as StudenCsv[];

  await prisma.item.createMany({
    data: rows.map(r => ({
      name: r.Name,
      age: Number(r.Age),
      dateOfBirth: new Date(r.DateOfBirth),
      score: Number(r.Score),
      active: r.Active?.toLocaleLowerCase() == "true" ? true: false,
      description: r.Description,
      joinDate: new Date(r.JoinDate)
    }))
  })

  return rows.length;
}