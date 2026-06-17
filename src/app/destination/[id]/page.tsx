import { notFound } from 'next/navigation'
import { getDestinationById } from '@/entities/destination/data/destinations'
import { DestinationPage } from '@/views/destination'

type Props = {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {
  const { id } = await params
  const destination = getDestinationById(id)
  if (!destination) notFound()
  return <DestinationPage destination={destination} />
}
