'use server'

import { customAlphabet } from 'nanoid'
import { alphanumeric } from 'nanoid-dictionary'
import { redirect } from 'next/navigation'
import { extname } from 'node:path'
import { array, file, mimeType, pipe, safeParse } from 'valibot'
import database from '@/modules/database'
import supabase from '@/modules/supabase'
import payloadGet from '../Jwt/payloadGet'
// import createProduct from '@/queries/create-product'
// import generateFilename from '@/utilities/generate-filename'
interface Announcement {
  color: string,
  drive: string,
  fuel: string,
  mileage: string,
  modelName: string,
  placeOfProduction: string,
  power: string,
  price: string,
  text: string,
  transmission: string,
  typeOfEquipment: string,
  volume: string,
  year: string
}
const FileSchema = pipe(
  file('Please select an image file'),
  mimeType(['image/jpeg', 'image/png'], 'Please select a JPEG or PNG file.')
)
const Schema = array(FileSchema)

// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
const nanoid = customAlphabet(`${alphanumeric}-`, 12)

function generateFilename(initialFilename: string) {
  const filename = nanoid()
  const extension = extname(initialFilename).replace('.', '')

  return `${filename}.${extension}`
}
export default async function CreateAnnouncement(
  photos: File[],
  brandName:string,
  announcement:Announcement
) {
  if (!photos[0].size) {
    return { error: 'Photos is null' }
  }
  const { output, success } = safeParse(Schema, photos)
  if (!success) {
    return { error: 'Validation error' }
  }

  // const filename = generateFilename(output.image.name)
  const pathes = []
  for (const oneFile of output) {
    const filename = generateFilename(oneFile.name)
    const { data, error } = await supabase.storage
      .from('images')
      .upload(filename, oneFile)
    if (error) {
      return { error: 'Image upload error' }
    }
    pathes.push(data.path)
  }
  const createdImage = await database
    .insertInto('image')
    .values({
      path: pathes
    })
    .returning(['id'])
    .executeTakeFirst()
  const payload = await payloadGet()
  const brand = await database
    .selectFrom('brand')
    .select('id')
    .where('name', '=', brandName)
    .execute()
  await database
    .insertInto('announcements')
    .values({
      brandId: brand[0].id,
      imageId: createdImage?.id,
      userId: payload.id,
      ...announcement
    })
    .executeTakeFirst()

  return null
}
