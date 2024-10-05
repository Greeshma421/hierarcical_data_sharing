import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from 'next/image'

export function ConsultDoctorsCard() {
  return (
    <Card className="md:col-span-2 bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-gray-700">Consult Top Doctors</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            Online Consultation with top Doctors from the US and Europe.
          </span>
          <Image src="/doctor-icon.png" alt="Doctor" width={48} height={48} />
        </div>
      </CardContent>
    </Card>
  )
}