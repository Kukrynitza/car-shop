'use server'
import supabase from '@/modules/supabase'

export default async function generateSrc(path:string) {
  const { data } = supabase.storage.from('images').getPublicUrl(path)

  return data.publicUrl
}
