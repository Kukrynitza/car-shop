'use server'

import { customAlphabet } from 'nanoid'
import { alphanumeric } from 'nanoid-dictionary'
import { extname } from 'node:path'
import { array, file, mimeType, pipe, safeParse } from 'valibot'
import database from '@/modules/database'
import supabase from '@/modules/supabase'
import payloadGet from '../Jwt/payloadGet'
// import createProduct from '@/queries/create-product'
// import generateFilename from '@/utilities/generate-filename'
interface Announcement {
  color: string | null,
  drive: string | null,
  fuel: string | null,
  mileage: number | null,
  modelName: string | null,
  placeOfProduction: string | null,
  power: number | null,
  price: number | null,
  text: string | null,
  transmission: string | null,
  typeOfEquipment: string | null,
  volume: number | null,
  year: number | null
}
const FileSchema = pipe(
  file('Please select an image file'),
  mimeType(['image/jpeg', 'image/png'], 'Please select a JPEG or PNG file.')
)
const Schema = array(FileSchema)

const nanoid = customAlphabet(`${alphanumeric} -`, 12)

function generateFilename(initialFilename: string) {
  const filename = nanoid()
  const extension = extname(initialFilename).replace('.', '')

  return `${filename}.${extension}`
}
export default async function createAnnouncement(
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
  const pathes = await Promise.all(
    output.map(async (oneFile) => {
      const filename = generateFilename(oneFile.name)
      const { data, error } = await supabase.storage
        .from('images')
        .upload(filename, oneFile)

      if (error) {
        return { error: 'Image upload error' }
      }

      return data.path
    })
  )
  const uploadedPaths = pathes.filter((result): result is string => typeof result === 'string')
  if (uploadedPaths.length === 0) {
    return { error: 'No images were uploaded successfully' }
  }
  const createdImage = await database
    .insertInto('image')
    .values({
      path: uploadedPaths
    })
    .returning(['id'])
    .executeTakeFirst()
  if (!createdImage) {
    return { error: 'Image creation failed' }
  }
  const payload = await payloadGet() as { id: string; role: string }
  const brand = await database
    .selectFrom('brand')
    .select('id')
    .where('name', '=', brandName)
    .execute()
  await database
    .insertInto('announcements')
    .values({
      brandId: brand[0].id,
      color: announcement.color,
      drive: announcement.drive,
      fuel: announcement.fuel,
      imageId: createdImage.id,
      mileage: Number(announcement.mileage),
      modelName: announcement.modelName,
      placeOfProduction: announcement.placeOfProduction,
      power: Number(announcement.power),
      price: Number(announcement.price),
      text: announcement.text,
      transmission: announcement.transmission,
      typeOfEquipment: announcement.typeOfEquipment,
      userId: Number(payload.id),
      volume: Number(announcement.volume),
      year: Number(announcement.year)
    })
    .executeTakeFirst()

  return null
}
