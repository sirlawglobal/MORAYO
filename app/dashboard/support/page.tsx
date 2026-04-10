import prisma from '@/lib/prisma'
import { updateSupportInfo } from '@/app/actions/wedding'
import { CreditCard, Save, Info } from 'lucide-react'
import { revalidatePath } from 'next/cache'

export const dynamic = 'force-dynamic'

export default async function SupportManagementPage() {
  let supports: { id: string; label: string; value: string }[] = []
  try {
    supports = await prisma.supportInfo.findMany()
  } catch (error) {
    console.error('Support info fetch failed:', error)
  }

  async function handleSupportUpdate(formData: FormData) {
    'use server'
    const id = formData.get('id') as string
    const value = formData.get('value') as string
    await updateSupportInfo(id, value)
    revalidatePath('/dashboard/support')
  }

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-serif">Registry & Payment Info</h1>
        <p className="text-gray-500 font-light">Manage bank details and contribution instructions.</p>
      </div>

      <div className="max-w-3xl">
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-brand-gold">
            <CreditCard size={24} />
            <h2 className="text-xl font-serif">Payment Methods</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {supports.length > 0 ? supports.map((support: { id: string; label: string; value: string }) => (
              <div key={support.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <form action={handleSupportUpdate} className="space-y-4">
                  <input type="hidden" name="id" value={support.id} />
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2 block">
                      {support.label}
                    </label>
                    <div className="space-y-4">
                      <input 
                        name="value" 
                        defaultValue={support.value}
                        className="w-full px-4 py-3 bg-gray-50 rounded-2xl focus:ring-2 focus:ring-brand-gold outline-none text-sm border-none transition-all"
                      />
                      <button className="w-full py-3 bg-white border border-brand-gold text-brand-gold rounded-2xl hover:bg-brand-gold hover:text-white transition-all flex items-center justify-center gap-2 text-sm font-medium shadow-sm">
                        <Save size={16} />
                        Update Field
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )) : (
              <div className="md:col-span-2 p-16 text-center text-gray-400 border-2 border-dashed border-gray-100 rounded-[3rem] flex flex-col items-center gap-3 shadow-inner">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
                  <Info size={32} className="text-gray-200" />
                </div>
                <p className="text-base font-medium">No registry fields found</p>
                <p className="text-xs font-light max-w-[200px] mx-auto">Add support information fields to your database to display them here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
