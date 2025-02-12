'use server'
import supabase from '@/modules/supabase'

// eslint-disable-next-line @typescript-eslint/require-await
export default async function generateSrc(path:string) {
  const { data } = supabase.storage.from('images').getPublicUrl(path)

  return data.publicUrl
}
