export default function Palette() {
  return (
    <div className="border border-solid border-white overflow-clip relative rounded-[2px] size-full" data-name="palette">
      <div className="absolute bg-[#ff4615] h-[140px] left-[73px] top-[243px] w-[280px]" />
      <div className="absolute bg-[#191919] h-[140px] left-[73px] top-[863px] w-[280px]" />
      <div className="absolute bg-[#ffe1d2] h-[140px] left-[73px] top-[708px] w-[280px]" />
      <div className="absolute h-[140px] left-[73px] top-[88px] w-[280px]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 280 140">
          <path d="M0 0H280V140H0V0Z" fill="var(--fill-0, #D90000)" id="Rectangle 35" />
        </svg>
      </div>
      <div className="absolute bg-[#ffbda4] h-[140px] left-[73px] top-[553px] w-[280px]" />
      <p className="absolute font-['Nunito_Sans:Bold',sans-serif] font-bold leading-[normal] left-[198px] text-[20px] text-black top-[765px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        BG
      </p>
      <p className="absolute font-['Nunito_Sans:Bold',sans-serif] font-bold leading-[normal] left-[198px] text-[20px] text-white top-[920px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        BG
      </p>
      <div className="absolute bg-[#ff8e69] h-[140px] left-[73px] top-[398px] w-[280px]" />
      <p className="absolute font-['Nunito_Sans:Bold',sans-serif] font-bold leading-[normal] left-[153px] text-[20px] text-white top-[455px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        normal state
      </p>
      <p className="absolute font-['Nunito_Sans:Bold',sans-serif] font-bold leading-[normal] left-[145px] text-[20px] text-white top-[610px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Disabled state
      </p>
      <p className="absolute font-['Nunito_Sans:Bold',sans-serif] font-bold leading-[normal] left-[147px] text-[20px] text-white top-[300px] whitespace-nowrap" dir="auto" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Hovered state
      </p>
      <p className="absolute font-['Nunito_Sans:Bold',sans-serif] font-bold leading-[normal] left-[163px] text-[20px] text-white top-[145px] whitespace-nowrap" dir="auto" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Error state
      </p>
    </div>
  );
}