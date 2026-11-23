'use client';
import { motion } from 'framer-motion';

const dishes = [
  ['Paneer Tikka', '₹280', 'Smoky, charred in the tandoor', true],
  ['Butter Chicken', '₹380', 'Silky tomato & butter gravy', false],
  ['Dal Makhani', '₹260', 'Slow-cooked overnight', true],
  ['Masala Chai', '₹60', 'Assam tea, ginger, cardamom', true],
] as const;

/** A phone showing a sample guest menu: the dishes slide in one after another. */
export default function HeroPhone() {
  return (
    <motion.div initial={{ opacity: 0, y: 40, rotate: 4 }} animate={{ opacity: 1, y: 0, rotate: 2 }} transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
      className="relative mx-auto w-[300px] rounded-[46px] bg-[#180d24] p-3 shadow-[0_50px_100px_-30px_rgba(34,21,46,.6)]" aria-label="Example of a guest menu" role="img">
      <div className="overflow-hidden rounded-[36px] bg-[#fff8ee]">
        <div className="relative h-40 bg-gradient-to-br from-[#3b1d0f] to-[#c2410c] p-5 text-white">
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#fff8ee] to-transparent" />
          <div className="relative mt-10 font-[family-name:var(--font-fraunces)] text-3xl font-bold leading-none">Saffron Courtyard</div>
          <div className="relative mt-1 text-xs opacity-85">North Indian · Jaipur</div>
        </div>
        <div className="space-y-2.5 p-3.5">
          {dishes.map(([n, p, d, veg], i) => (
            <motion.div key={n} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 + i * 0.15, duration: 0.6 }} className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm">
              <span className={`grid size-3.5 shrink-0 place-items-center rounded-[3px] border-[1.5px] ${veg ? 'border-green-600' : 'border-red-600'}`}><i className={`block size-1.5 rounded-full ${veg ? 'bg-green-600' : 'bg-red-600'}`} /></span>
              <div className="min-w-0 flex-1"><div className="truncate text-sm font-bold text-[#2b160a]">{n}</div><div className="truncate text-[11px] text-[#7a5b48]">{d}</div></div>
              <div className="text-right"><div className="text-sm font-extrabold text-[#2b160a]">{p}</div><div className="mt-0.5 rounded-md border border-[#c2410c] px-2 text-[10px] font-extrabold text-[#c2410c]">ADD</div></div>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ y: 80 }} animate={{ y: 0 }} transition={{ delay: 1.5, type: 'spring', stiffness: 300, damping: 24 }} className="m-3.5 flex items-center justify-between rounded-2xl bg-[#c2410c] px-4 py-3 text-sm font-extrabold text-white">
          <span>2 items · ₹540</span><span>View order</span>
        </motion.div>
      </div>
    </motion.div>
  );
}
