import prisma from '@/lib/prisma'
import { updateSupportDetail } from '@/app/actions/wedding'
import { Wallet, Save, Diamond, Globe, Landmark } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function SupportManagementPage() {
  let supportDetails: any[] = []
  try {
    supportDetails = await prisma.supportDetail.findMany()
  } catch (error) {
    console.error('Support details fetch failed:', error)
  }

  async function handleUpdate(formData: FormData) {
    'use server'
    await updateSupportDetail(formData)
  }

  return (
    <div className="space-y-12 font-sans">
      <div>
        <h1 className="text-4xl font-serif text-brand-deep">Registry <span className="text-brand-lavender italic">Management</span></h1>
        <p className="text-gray-400 font-medium text-sm mt-2">Update your bank credentials and gift support information.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {supportDetails.length > 0 ? supportDetails.map((detail) => (
          <div key={detail.id} className="bg-white p-10 rounded-[3rem] shadow-premium border border-brand-lavender/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 text-brand-gold/5 group-hover:text-brand-gold/10 transition-colors">
              <Landmark size={120} />
            </div>

            <form action={handleUpdate} className="space-y-8 relative z-10">
               <input type="hidden" name="id" value={detail.id} />
               
               <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-brand-cream text-brand-gold rounded-2xl flex items-center justify-center shadow-sm">
                    {detail.currency === 'USD' ? <Globe size={24} /> : <Landmark size={24} />}
                  </div>
                  <h3 className="text-2xl font-serif text-brand-deep">{detail.currency} Account</h3>
               </div>

               <div className="space-y-6">
                 <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold ml-1">Bank Name</label>
                    <input 
                      name="bank" 
                      defaultValue={detail.bank}
                      className="w-full px-6 py-4 bg-brand-cream/50 rounded-2xl border-none focus:ring-2 focus:ring-brand-gold outline-none text-brand-deep font-semibold text-sm transition-all"
                    />
                 </div>

                 <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold ml-1">Account Number</label>
                    <input 
                      name="accountNum" 
                      defaultValue={detail.accountNum}
                      className="w-full px-6 py-4 bg-brand-cream/50 rounded-2xl border-none focus:ring-2 focus:ring-brand-gold outline-none text-brand-deep font-semibold text-sm transition-all"
                    />
                 </div>

                 <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold ml-1">Account Name</label>
                    <input 
                      name="accountName" 
                      defaultValue={detail.accountName}
                      className="w-full px-6 py-4 bg-brand-cream/50 rounded-2xl border-none focus:ring-2 focus:ring-brand-gold outline-none text-brand-deep font-semibold text-sm transition-all"
                    />
                 </div>
               </div>

               <button className="w-full py-5 bg-brand-deep text-white rounded-[2rem] hover:bg-black transition-all duration-500 flex items-center justify-center gap-3 text-xs font-bold tracking-[0.2em] uppercase shadow-xl group/btn overflow-hidden relative mt-4">
                  <span className="relative z-10">Save {detail.currency} Details</span>
                  <Save size={18} className="relative z-10 text-brand-gold" />
                  <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-all duration-1000 group-hover/btn:left-[100%]" />
               </button>
            </form>
          </div>
        )) : (
          <div className="p-20 text-center bg-white rounded-[4rem] border-2 border-dashed border-gray-100 shadow-premium col-span-full">
            <Wallet size={48} className="mx-auto text-gray-200 mb-4" />
            <p className="text-xl font-serif text-gray-400 italic">No registry accounts found</p>
          </div>
        )}
      </div>
    </div>
  )
}
