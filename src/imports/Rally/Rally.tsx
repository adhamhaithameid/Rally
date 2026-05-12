import svgPaths from "./svg-dmvk27lz5j";

function Icon() {
  return (
    <div className="absolute left-[7px] size-[26px] top-[7px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 26">
        <g clipPath="url(#clip0_491_1163)" id="Icon">
          <path d={svgPaths.p16de5600} fill="var(--fill-0, #FF4615)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_491_1163">
            <rect fill="white" height="26" width="26" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text() {
  return (
    <div className="absolute bg-[#ff4615] content-stretch flex items-center justify-center left-[24px] p-px rounded-[16777200px] size-[14px] top-[24px]" data-name="Text">
      <div aria-hidden="true" className="absolute border border-[#2c2c2c] border-solid inset-0 pointer-events-none rounded-[16777200px]" />
      <p className="font-['Nunito_Sans:Bold',sans-serif] font-bold leading-[8px] relative shrink-0 text-[8px] text-center text-white whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        2
      </p>
    </div>
  );
}

function ButtonSwitchRallyVersion() {
  return (
    <div className="absolute left-[16px] rounded-[10px] size-[40px] top-[16px]" data-name="Button - Switch Rally version">
      <Icon />
      <Text />
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[73px] relative shrink-0 w-[72px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.06)] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <ButtonSwitchRallyVersion />
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[12.5%] left-[37.5%] right-[37.5%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-11.11%_-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.66667 9.16667">
            <path d={svgPaths.p12f93600} id="Vector" stroke="var(--stroke-0, #FFF2ED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[8.34%_12.5%_12.5%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.26%_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6667 17.4996">
            <path d={svgPaths.p29aa3400} id="Vector" stroke="var(--stroke-0, #FFF2ED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function LayoutInner1() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[18px] size-[20px] top-[10px]" data-name="LayoutInner">
      <Icon1 />
    </div>
  );
}

function LayoutInner2() {
  return (
    <div className="absolute h-[12.5px] left-[4px] overflow-clip top-[34px] w-[48px]" data-name="LayoutInner">
      <p className="-translate-x-1/2 absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[12.5px] left-[24.34px] text-[#8a807c] text-[10px] text-center top-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Home
      </p>
    </div>
  );
}

function Link() {
  return (
    <div className="absolute h-[56.5px] left-0 rounded-[16px] top-0 w-[56px]" data-name="Link">
      <LayoutInner1 />
      <LayoutInner2 />
    </div>
  );
}

function ListItem() {
  return (
    <div className="h-[56.5px] relative shrink-0 w-full" data-name="List Item">
      <Link />
    </div>
  );
}

function Icon2() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6667 16.6667">
            <path d={svgPaths.p3dc58000} id="Vector" stroke="var(--stroke-0, #FFF2ED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function LayoutInner3() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[18px] size-[20px] top-[10px]" data-name="LayoutInner">
      <Icon2 />
    </div>
  );
}

function LayoutInner4() {
  return (
    <div className="absolute h-[12.5px] left-[4px] overflow-clip top-[34px] w-[48px]" data-name="LayoutInner">
      <p className="-translate-x-1/2 absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[12.5px] left-[24.25px] text-[#8a807c] text-[10px] text-center top-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Chat
      </p>
    </div>
  );
}

function Link1() {
  return (
    <div className="absolute h-[56.5px] left-0 rounded-[16px] top-0 w-[56px]" data-name="Link">
      <LayoutInner3 />
      <LayoutInner4 />
    </div>
  );
}

function ListItem1() {
  return (
    <div className="h-[56.5px] relative shrink-0 w-full" data-name="List Item">
      <Link1 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[66.67%] left-[33.33%] right-1/2 top-[16.67%]" data-name="Vector">
        <div className="absolute inset-[-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 5">
            <path d={svgPaths.p320b1d00} id="Vector" stroke="var(--stroke-0, #FF9571)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[33.33%_16.67%_16.67%_16.67%]" data-name="Vector">
        <div className="absolute inset-[-8.33%_-6.25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 11.6667">
            <path d={svgPaths.p2b6eb300} id="Vector" stroke="var(--stroke-0, #FF9571)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[58.33%_83.33%_41.67%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-0.83px_-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.33333 1.66667">
            <path d="M0.833333 0.833333H2.5" id="Vector" stroke="var(--stroke-0, #FF9571)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[58.33%_8.33%_41.67%_83.33%]" data-name="Vector">
        <div className="absolute inset-[-0.83px_-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.33333 1.66667">
            <path d="M0.833333 0.833333H2.5" id="Vector" stroke="var(--stroke-0, #FF9571)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[54.17%_37.5%_37.5%_62.5%]" data-name="Vector">
        <div className="absolute inset-[-50%_-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.66667 3.33333">
            <path d="M0.833333 0.833333V2.5" id="Vector" stroke="var(--stroke-0, #FF9571)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[54.17%_62.5%_37.5%_37.5%]" data-name="Vector">
        <div className="absolute inset-[-50%_-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.66667 3.33333">
            <path d="M0.833333 0.833333V2.5" id="Vector" stroke="var(--stroke-0, #FF9571)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function LayoutInner5() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[18px] size-[20px] top-[10px]" data-name="LayoutInner">
      <Icon3 />
    </div>
  );
}

function LayoutInner6() {
  return (
    <div className="absolute h-[12.5px] left-[4px] overflow-clip top-[34px] w-[48px]" data-name="LayoutInner">
      <p className="-translate-x-1/2 absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[12.5px] left-[24.23px] text-[#8a807c] text-[10px] text-center top-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        AI Chat
      </p>
    </div>
  );
}

function Link2() {
  return (
    <div className="absolute bg-[#440608] h-[56.5px] left-0 rounded-[16px] top-0 w-[56px]" data-name="Link">
      <LayoutInner5 />
      <LayoutInner6 />
    </div>
  );
}

function ListItem2() {
  return (
    <div className="bg-[#440608] h-[56.5px] relative rounded-[16px] shrink-0 w-full" data-name="List Item">
      <Link2 />
    </div>
  );
}

function Icon4() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6667 16.6667">
            <path d={svgPaths.p506dac0} id="Vector" stroke="var(--stroke-0, #FFF2ED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[16.67%_8.33%_41.67%_37.5%]" data-name="Vector">
        <div className="absolute inset-[-10%_-7.69%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.5 10">
            <path d={svgPaths.pafc1d00} id="Vector" stroke="var(--stroke-0, #FFF2ED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function LayoutInner7() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[18px] size-[20px] top-[10px]" data-name="LayoutInner">
      <Icon4 />
    </div>
  );
}

function LayoutInner8() {
  return (
    <div className="absolute h-[12.5px] left-[4px] overflow-clip top-[34px] w-[48px]" data-name="LayoutInner">
      <p className="-translate-x-1/2 absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[12.5px] left-[24.35px] text-[#8a807c] text-[10px] text-center top-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        To-Do
      </p>
    </div>
  );
}

function Link3() {
  return (
    <div className="absolute h-[56.5px] left-0 rounded-[16px] top-0 w-[56px]" data-name="Link">
      <LayoutInner7 />
      <LayoutInner8 />
    </div>
  );
}

function ListItem3() {
  return (
    <div className="h-[56.5px] relative shrink-0 w-full" data-name="List Item">
      <Link3 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-3/4 left-[33.33%] right-[66.67%] top-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-25%_-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.66667 5">
            <path d="M0.833333 0.833333V4.16667" id="Vector" stroke="var(--stroke-0, #FFF2ED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[66.67%] right-[33.33%] top-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-25%_-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.66667 5">
            <path d="M0.833333 0.833333V4.16667" id="Vector" stroke="var(--stroke-0, #FFF2ED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[16.67%_12.5%_8.33%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6667 16.6667">
            <path d={svgPaths.pf3beb80} id="Vector" stroke="var(--stroke-0, #FFF2ED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[41.67%_12.5%_58.33%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-0.83px_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6667 1.66667">
            <path d="M0.833333 0.833333H15.8333" id="Vector" stroke="var(--stroke-0, #FFF2ED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function LayoutInner9() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[18px] size-[20px] top-[10px]" data-name="LayoutInner">
      <Icon5 />
    </div>
  );
}

function LayoutInner10() {
  return (
    <div className="absolute h-[12.5px] left-[4px] overflow-clip top-[34px] w-[48px]" data-name="LayoutInner">
      <p className="-translate-x-1/2 absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[12.5px] left-[24.03px] text-[#8a807c] text-[10px] text-center top-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Calendar
      </p>
    </div>
  );
}

function Link4() {
  return (
    <div className="absolute h-[56.5px] left-0 rounded-[16px] top-0 w-[56px]" data-name="Link">
      <LayoutInner9 />
      <LayoutInner10 />
    </div>
  );
}

function ListItem4() {
  return (
    <div className="h-[56.5px] relative shrink-0 w-full" data-name="List Item">
      <Link4 />
    </div>
  );
}

function Icon6() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[12.5%_8.32%_16.67%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-5.88%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3363 15.8335">
            <path d={svgPaths.p2d3ab080} id="Vector" stroke="var(--stroke-0, #FFF2ED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function LayoutInner11() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[18px] size-[20px] top-[10px]" data-name="LayoutInner">
      <Icon6 />
    </div>
  );
}

function LayoutInner12() {
  return (
    <div className="absolute h-[12.5px] left-[4px] overflow-clip top-[34px] w-[48px]" data-name="LayoutInner">
      <p className="-translate-x-1/2 absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[12.5px] left-[24.41px] text-[#8a807c] text-[10px] text-center top-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Files
      </p>
    </div>
  );
}

function Link5() {
  return (
    <div className="absolute h-[56.5px] left-0 rounded-[16px] top-0 w-[56px]" data-name="Link">
      <LayoutInner11 />
      <LayoutInner12 />
    </div>
  );
}

function ListItem5() {
  return (
    <div className="h-[56.5px] relative shrink-0 w-full" data-name="List Item">
      <Link5 />
    </div>
  );
}

function Icon7() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[62.5%_33.33%_12.5%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 6.66667">
            <path d={svgPaths.p6877e0} id="Vector" stroke="var(--stroke-0, #FFF2ED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[12.5%_45.83%_54.17%_20.83%]" data-name="Vector">
        <div className="absolute inset-[-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.33333 8.33333">
            <path d={svgPaths.p3ffa2780} id="Vector" stroke="var(--stroke-0, #FFF2ED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[63.04%_8.33%_12.5%_79.17%]" data-name="Vector">
        <div className="absolute inset-[-17.04%_-33.33%_-17.04%_-33.34%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.16687 6.55854">
            <path d={svgPaths.p39df7200} id="Vector" stroke="var(--stroke-0, #FFF2ED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[13.04%_20.8%_54.67%_66.67%]" data-name="Vector">
        <div className="absolute inset-[-12.91%_-33.25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.1734 8.1254">
            <path d={svgPaths.p159fd500} id="Vector" stroke="var(--stroke-0, #FFF2ED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function LayoutInner13() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[18px] size-[20px] top-[10px]" data-name="LayoutInner">
      <Icon7 />
    </div>
  );
}

function LayoutInner14() {
  return (
    <div className="absolute h-[12.5px] left-[4px] overflow-clip top-[34px] w-[48px]" data-name="LayoutInner">
      <p className="-translate-x-1/2 absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[12.5px] left-[24.09px] text-[#8a807c] text-[10px] text-center top-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Team
      </p>
    </div>
  );
}

function Link6() {
  return (
    <div className="absolute h-[56.5px] left-0 rounded-[16px] top-0 w-[56px]" data-name="Link">
      <LayoutInner13 />
      <LayoutInner14 />
    </div>
  );
}

function ListItem6() {
  return (
    <div className="h-[56.5px] relative shrink-0 w-full" data-name="List Item">
      <Link6 />
    </div>
  );
}

function Icon8() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[70.83%] left-[54.17%] right-[41.67%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-100%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.5 2.5">
            <path d={svgPaths.p1bfd110} fill="var(--fill-0, #FFF2ED)" id="Vector" stroke="var(--stroke-0, #FFF2ED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[54.17%] left-[70.83%] right-1/4 top-[41.67%]" data-name="Vector">
        <div className="absolute inset-[-100%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.5 2.5">
            <path d={svgPaths.p1bfd110} fill="var(--fill-0, #FFF2ED)" id="Vector" stroke="var(--stroke-0, #FFF2ED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[29.17%_62.5%_66.67%_33.33%]" data-name="Vector">
        <div className="absolute inset-[-100%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.5 2.5">
            <path d={svgPaths.p1bfd110} fill="var(--fill-0, #FFF2ED)" id="Vector" stroke="var(--stroke-0, #FFF2ED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[45.83%] left-1/4 right-[70.83%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-100%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.5 2.5">
            <path d={svgPaths.p1bfd110} fill="var(--fill-0, #FFF2ED)" id="Vector" stroke="var(--stroke-0, #FFF2ED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[8.33%_8.37%_8.33%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3267 18.3333">
            <path d={svgPaths.p2a843d00} id="Vector" stroke="var(--stroke-0, #FFF2ED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function LayoutInner15() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[18px] size-[20px] top-[10px]" data-name="LayoutInner">
      <Icon8 />
    </div>
  );
}

function LayoutInner16() {
  return (
    <div className="absolute h-[12.5px] left-[4px] overflow-clip top-[34px] w-[48px]" data-name="LayoutInner">
      <p className="-translate-x-1/2 absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[12.5px] left-[24.45px] text-[#8a807c] text-[10px] text-center top-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        System
      </p>
    </div>
  );
}

function Link7() {
  return (
    <div className="absolute h-[56.5px] left-0 rounded-[16px] top-0 w-[56px]" data-name="Link">
      <LayoutInner15 />
      <LayoutInner16 />
    </div>
  );
}

function ListItem7() {
  return (
    <div className="h-[56.5px] relative shrink-0 w-full" data-name="List Item">
      <Link7 />
    </div>
  );
}

function Icon9() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-1/2 left-[8.35%] right-[8.26%] top-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-10%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3442 10.0006">
            <path d={svgPaths.p2acfac00} id="Vector" stroke="var(--stroke-0, #FFF2ED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[29.17%] left-[8.33%] right-[8.33%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-20.01%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3334 5.83174">
            <path d={svgPaths.p21f74a00} id="Vector" stroke="var(--stroke-0, #FFF2ED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[70.83%_8.33%_8.34%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-20.01%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3334 5.83174">
            <path d={svgPaths.p21f74a00} id="Vector" stroke="var(--stroke-0, #FFF2ED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function LayoutInner17() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[18px] size-[20px] top-[10px]" data-name="LayoutInner">
      <Icon9 />
    </div>
  );
}

function LayoutInner18() {
  return (
    <div className="absolute h-[12.5px] left-[4px] overflow-clip top-[34px] w-[48px]" data-name="LayoutInner">
      <p className="-translate-x-1/2 absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[12.5px] left-[24.19px] text-[#8a807c] text-[10px] text-center top-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Themes
      </p>
    </div>
  );
}

function Link8() {
  return (
    <div className="absolute h-[56.5px] left-0 rounded-[16px] top-0 w-[56px]" data-name="Link">
      <LayoutInner17 />
      <LayoutInner18 />
    </div>
  );
}

function ListItem8() {
  return (
    <div className="h-[56.5px] relative shrink-0 w-full" data-name="List Item">
      <Link8 />
    </div>
  );
}

function Icon10() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[9.73%] left-[8.33%] right-1/2 top-[43.75%]" data-name="Vector">
        <div className="absolute inset-[-8.96%_-10%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10.9713">
            <path d={svgPaths.p1aa4d700} id="Vector" stroke="var(--stroke-0, #FFF2ED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[56.88%_70.83%_31.25%_9.42%]" data-name="Vector">
        <div className="absolute inset-[-35.09%_-21.1%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.61692 4.04192">
            <path d={svgPaths.p16cb064} id="Vector" stroke="var(--stroke-0, #FFF2ED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[31.25%] left-[29.17%] right-1/2 top-[56.25%]" data-name="Vector">
        <div className="absolute inset-[-33.34%_-20%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.83359 4.16692">
            <path d={svgPaths.p2161cf80} id="Vector" stroke="var(--stroke-0, #FFF2ED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[68.75%_70.83%_9.71%_29.17%]" data-name="Vector">
        <div className="absolute inset-[-19.34%_-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.66667 5.975">
            <path d="M0.833333 0.833333V5.14167" id="Vector" stroke="var(--stroke-0, #FFF2ED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[9.73%] left-1/2 right-[8.33%] top-[43.75%]" data-name="Vector">
        <div className="absolute inset-[-8.96%_-10%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10.9713">
            <path d={svgPaths.p37e0080} id="Vector" stroke="var(--stroke-0, #FFF2ED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[31.25%] left-1/2 right-[29.17%] top-[56.25%]" data-name="Vector">
        <div className="absolute inset-[-33.34%_-20%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.83359 4.16692">
            <path d={svgPaths.p22b0c400} id="Vector" stroke="var(--stroke-0, #FFF2ED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[56.88%_9.42%_31.25%_70.83%]" data-name="Vector">
        <div className="absolute inset-[-35.09%_-21.1%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.61692 4.04192">
            <path d={svgPaths.p39109880} id="Vector" stroke="var(--stroke-0, #FFF2ED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[68.75%_29.17%_9.71%_70.83%]" data-name="Vector">
        <div className="absolute inset-[-19.34%_-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.66667 5.975">
            <path d="M0.833333 0.833333V5.14167" id="Vector" stroke="var(--stroke-0, #FFF2ED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[9.73%_29.17%_43.75%_29.17%]" data-name="Vector">
        <div className="absolute inset-[-8.96%_-10%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10.9713">
            <path d={svgPaths.p16b80500} id="Vector" stroke="var(--stroke-0, #FFF2ED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[66.67%] left-[30.25%] right-1/2 top-[21.46%]" data-name="Vector">
        <div className="absolute inset-[-35.09%_-21.1%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.61692 4.04192">
            <path d={svgPaths.p1c58bc50} id="Vector" stroke="var(--stroke-0, #FFF2ED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[66.67%] left-1/2 right-[30.25%] top-[21.46%]" data-name="Vector">
        <div className="absolute inset-[-35.09%_-21.1%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.61692 4.04192">
            <path d={svgPaths.p337d68c0} id="Vector" stroke="var(--stroke-0, #FFF2ED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[43.75%] left-1/2 right-1/2 top-[33.33%]" data-name="Vector">
        <div className="absolute inset-[-18.18%_-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.66667 6.25">
            <path d="M0.833333 5.41667V0.833333" id="Vector" stroke="var(--stroke-0, #FFF2ED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function LayoutInner19() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[18px] size-[20px] top-[10px]" data-name="LayoutInner">
      <Icon10 />
    </div>
  );
}

function LayoutInner20() {
  return (
    <div className="absolute h-[12.5px] left-[4px] overflow-clip top-[34px] w-[48px]" data-name="LayoutInner">
      <p className="-translate-x-1/2 absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[12.5px] left-[24.24px] text-[#8a807c] text-[10px] text-center top-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Elements
      </p>
    </div>
  );
}

function Link9() {
  return (
    <div className="absolute h-[56.5px] left-0 rounded-[16px] top-0 w-[56px]" data-name="Link">
      <LayoutInner19 />
      <LayoutInner20 />
    </div>
  );
}

function ListItem9() {
  return (
    <div className="h-[56.5px] relative shrink-0 w-full" data-name="List Item">
      <Link9 />
    </div>
  );
}

function List() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[601px] items-start relative shrink-0 w-full" data-name="List">
      <ListItem />
      <ListItem1 />
      <ListItem2 />
      <ListItem3 />
      <ListItem4 />
      <ListItem5 />
      <ListItem6 />
      <ListItem7 />
      <ListItem8 />
      <ListItem9 />
    </div>
  );
}

function Navigation() {
  return (
    <div className="flex-[564_0_0] min-h-px relative w-[72px]" data-name="Navigation">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[12px] px-[8px] relative size-full">
          <List />
        </div>
      </div>
    </div>
  );
}

function Icon11() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-[20px]" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute inset-[33.33%]" data-name="Vector">
          <div className="absolute inset-[-12.5%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.33333 8.33333">
              <path d={svgPaths.p3ffa2780} id="Vector" stroke="var(--stroke-0, #FFF2ED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-[83.33%] left-1/2 right-1/2 top-[8.33%]" data-name="Vector">
          <div className="absolute inset-[-50%_-0.83px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.66667 3.33333">
              <path d="M0.833333 0.833333V2.5" id="Vector" stroke="var(--stroke-0, #FFF2ED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-[8.33%] left-1/2 right-1/2 top-[83.33%]" data-name="Vector">
          <div className="absolute inset-[-50%_-0.83px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.66667 3.33333">
              <path d="M0.833333 0.833333V2.5" id="Vector" stroke="var(--stroke-0, #FFF2ED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[20.54%_73.58%_73.58%_20.54%]" data-name="Vector">
          <div className="absolute inset-[-70.92%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.84167 2.84167">
              <path d={svgPaths.p30e8c300} id="Vector" stroke="var(--stroke-0, #FFF2ED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[73.58%_20.54%_20.54%_73.58%]" data-name="Vector">
          <div className="absolute inset-[-70.92%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.84167 2.84167">
              <path d={svgPaths.p30e8c300} id="Vector" stroke="var(--stroke-0, #FFF2ED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-1/2 left-[8.33%] right-[83.33%] top-1/2" data-name="Vector">
          <div className="absolute inset-[-0.83px_-50%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.33333 1.66667">
              <path d="M0.833333 0.833333H2.5" id="Vector" stroke="var(--stroke-0, #FFF2ED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-1/2 left-[83.33%] right-[8.33%] top-1/2" data-name="Vector">
          <div className="absolute inset-[-0.83px_-50%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.33333 1.66667">
              <path d="M0.833333 0.833333H2.5" id="Vector" stroke="var(--stroke-0, #FFF2ED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[73.58%_73.58%_20.54%_20.54%]" data-name="Vector">
          <div className="absolute inset-[-70.92%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.84167 2.84167">
              <path d={svgPaths.p2061fa80} id="Vector" stroke="var(--stroke-0, #FFF2ED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[20.54%_20.54%_73.58%_73.58%]" data-name="Vector">
          <div className="absolute inset-[-70.92%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.84167 2.84167">
              <path d={svgPaths.p2061fa80} id="Vector" stroke="var(--stroke-0, #FFF2ED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[12.5px] relative shrink-0 w-[32.516px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[12.5px] left-[16.5px] text-[#8a807c] text-[10px] text-center top-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
          Theme
        </p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="h-[56.5px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[4px] items-center px-[4px] py-[10px] relative size-full">
          <Icon11 />
          <Text1 />
        </div>
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[16px] relative shrink-0 w-[3.977px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[16px] relative shrink-0 text-[12px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
          J
        </p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute bg-[#ff4615] content-stretch flex items-center justify-center left-[14px] pl-[12.008px] pr-[12.016px] rounded-[16777200px] size-[28px] top-[10px]" data-name="Container">
      <Text2 />
    </div>
  );
}

function Button1() {
  return <div className="absolute bg-[#22c55e] border-2 border-[#2c2c2c] border-solid left-[32px] rounded-[16777200px] size-[12px] top-[28px]" data-name="Button" />;
}

function LayoutInner21() {
  return (
    <div className="absolute h-[12.5px] left-[4px] overflow-clip top-[42px] w-[48px]" data-name="LayoutInner">
      <p className="-translate-x-1/2 absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[12.5px] left-[24.01px] text-[#8a807c] text-[10px] text-center top-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Profile
      </p>
    </div>
  );
}

function Link10() {
  return (
    <div className="h-[64.5px] relative rounded-[16px] shrink-0 w-full" data-name="Link">
      <Container3 />
      <Button1 />
      <LayoutInner21 />
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[150px] relative shrink-0 w-[72px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.06)] border-solid border-t inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start pt-[13px] px-[8px] relative size-full">
        <Button />
        <Link10 />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="flex-[1_0_0] h-[787px] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container1 />
        <Navigation />
        <Container2 />
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <div className="bg-[#2c2c2c] h-[789px] relative rounded-[20px] shrink-0 w-[74px]" data-name="Sidebar">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <Container />
      </div>
      <div aria-hidden="true" className="absolute border border-[#4a403c] border-solid inset-0 pointer-events-none rounded-[20px]" />
    </div>
  );
}

function Icon12() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M3.33333 8H12.6667" id="Vector" stroke="var(--stroke-0, #C7B8B2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 3.33333V12.6667" id="Vector_2" stroke="var(--stroke-0, #C7B8B2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 px-[6px] rounded-[7px] size-[28px] top-0" data-name="Button">
      <Icon12 />
    </div>
  );
}

function Icon13() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p8cdb700} id="Vector" stroke="var(--stroke-0, #C7B8B2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M12.25 12.25L9.74167 9.74167" id="Vector_2" stroke="var(--stroke-0, #C7B8B2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[167px] px-[6px] rounded-[7px] size-[28px] top-0" data-name="Button">
      <Icon13 />
    </div>
  );
}

function Icon14() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M3.33333 8H12.6667" id="Vector" stroke="var(--stroke-0, #C7B8B2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 3.33333V12.6667" id="Vector_2" stroke="var(--stroke-0, #C7B8B2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[195px] px-[6px] rounded-[7px] size-[28px] top-0" data-name="Button">
      <Icon14 />
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Container">
      <Button2 />
      <Button3 />
      <Button4 />
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[44px] relative shrink-0 w-[247px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#4a403c] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[12px] py-[8px] relative size-full">
        <Container5 />
      </div>
    </div>
  );
}

function Icon15() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d="M5.25 10.5L8.75 7L5.25 3.5" id="Vector" stroke="var(--stroke-0, #C7B8B2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div className="content-stretch flex items-center justify-center px-[5px] relative rounded-[6px] size-[24px]" data-name="Button">
      <Icon15 />
    </div>
  );
}

function Icon16() {
  return (
    <div className="absolute left-[10px] size-[12px] top-[6px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M6 8.5V11" id="Vector" stroke="var(--stroke-0, #C7B8B2)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p3f5ae100} id="Vector_2" stroke="var(--stroke-0, #C7B8B2)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[23px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[0] left-[27px] text-[#c7b8b2] text-[10px] top-[4.5px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <span className="leading-[15px]">P</span>
        <span className="capitalize leading-[15px]">inned</span>
      </p>
      <div className="absolute flex items-center justify-center left-[215px] size-[24px] top-0" style={{ "--transform-inner-width": "300", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <Button5 />
        </div>
      </div>
      <Icon16 />
    </div>
  );
}

function Text3() {
  return (
    <div className="flex-[158.766_0_0] h-[18px] min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[18px] left-0 text-[#fff2ed] text-[12px] top-0 whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
          Sprint planning prep
        </p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="h-[18px] relative shrink-0 w-[219px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Text3 />
      </div>
    </div>
  );
}

function ThreadRow() {
  return (
    <div className="content-stretch flex flex-col h-[35px] items-start px-[10px] py-[8px] relative rounded-[9px] shrink-0 w-[239px]" data-name="ThreadRow">
      <Container7 />
    </div>
  );
}

function Section() {
  return (
    <div className="content-stretch flex flex-col h-[58px] items-start relative shrink-0 w-full" data-name="Section">
      <Paragraph />
      <ThreadRow />
    </div>
  );
}

function Icon17() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d="M5.25 10.5L8.75 7L5.25 3.5" id="Vector" stroke="var(--stroke-0, #C7B8B2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div className="content-stretch flex items-center justify-center px-[5px] relative rounded-[6px] size-[24px]" data-name="Button">
      <Icon17 />
    </div>
  );
}

function Icon18() {
  return (
    <div className="absolute left-[10px] size-[12px] top-[5px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p3e661000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[23px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute capitalize font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[15px] left-[27px] text-[#c7b8b2] text-[10px] top-[3.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Recents
      </p>
      <div className="absolute flex items-center justify-center left-[215px] size-[24px] top-0" style={{ "--transform-inner-width": "300", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <Button6 />
        </div>
      </div>
      <Icon18 />
    </div>
  );
}

function Text4() {
  return (
    <div className="flex-[164.836_0_0] h-[18px] min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[18px] left-0 text-[#fff2ed] text-[12px] top-0 whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
          What changed since Monday?
        </p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[18px] relative shrink-0 w-[219px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Text4 />
      </div>
    </div>
  );
}

function ThreadRow1() {
  return (
    <div className="h-[34px] mb-[-8px] relative rounded-[9px] shrink-0 w-full" data-name="ThreadRow">
      <div className="content-stretch flex flex-col items-start px-[10px] py-[8px] relative size-full">
        <Container9 />
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="flex-[164.836_0_0] h-[18px] min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[18px] left-0 text-[#fff2ed] text-[12px] top-0 whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
          Draft status report
        </p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[18px] relative shrink-0 w-[219px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Text5 />
      </div>
    </div>
  );
}

function ThreadRow2() {
  return (
    <div className="h-[34px] mb-[-8px] relative rounded-[9px] shrink-0 w-full" data-name="ThreadRow">
      <div className="content-stretch flex flex-col items-start px-[10px] py-[8px] relative size-full">
        <Container10 />
      </div>
    </div>
  );
}

function Text6() {
  return (
    <div className="flex-[182.586_0_0] h-[18px] min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[18px] left-0 text-[#fff2ed] text-[12px] top-0 whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
          Onboarding flow review
        </p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[18px] relative shrink-0 w-[219px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Text6 />
      </div>
    </div>
  );
}

function ThreadRow3() {
  return (
    <div className="h-[34px] mb-[-8px] relative rounded-[9px] shrink-0 w-full" data-name="ThreadRow">
      <div className="content-stretch flex flex-col items-start px-[10px] py-[8px] relative size-full">
        <Container11 />
      </div>
    </div>
  );
}

function Text7() {
  return (
    <div className="flex-[182.586_0_0] h-[18px] min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[18px] left-0 text-[#fff2ed] text-[12px] top-0 whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
          Team productivity check
        </p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="h-[18px] relative shrink-0 w-[219px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Text7 />
      </div>
    </div>
  );
}

function ThreadRow4() {
  return (
    <div className="h-[34px] relative rounded-[9px] shrink-0 w-full" data-name="ThreadRow">
      <div className="content-stretch flex flex-col items-start px-[10px] py-[8px] relative size-full">
        <Container12 />
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col h-[242px] items-start relative shrink-0 w-full" data-name="Container">
      <ThreadRow1 />
      <ThreadRow2 />
      <ThreadRow3 />
      <ThreadRow4 />
    </div>
  );
}

function Section1() {
  return (
    <div className="content-stretch flex flex-col h-[265px] items-start relative shrink-0 w-full" data-name="Section">
      <Paragraph1 />
      <Container8 />
    </div>
  );
}

function Container6() {
  return (
    <div className="flex-[610_0_0] min-h-px relative w-[247px]" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[25px] items-start pt-[8px] px-[4px] relative size-full">
          <Section />
          <Section1 />
        </div>
      </div>
    </div>
  );
}

function AiSidebar() {
  return (
    <div className="bg-[#2c2c2c] h-[789px] relative shrink-0 w-[248px]" data-name="AISidebar">
      <div aria-hidden="true" className="absolute border-[#4a403c] border-r border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pr-px relative size-full">
        <Container4 />
        <Container6 />
      </div>
    </div>
  );
}

function Icon19() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_518_324)" id="Icon">
          <path d={svgPaths.p3296cd80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M15 2.25V5.25" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M16.5 3.75H13.5" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M3 12.75V14.25" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M3.75 13.5H2.25" id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_518_324">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function AiAvatar() {
  return (
    <div className="bg-[#ff4615] relative rounded-[8px] shrink-0 size-[36px]" data-name="AIAvatar">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[9px] relative size-full">
        <Icon19 />
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex h-[36px] items-center justify-center left-1/2 px-[218.5px] top-0 w-[473px]" data-name="Container">
      <AiAvatar />
    </div>
  );
}

function Heading() {
  return (
    <div className="-translate-x-1/2 absolute h-[33px] left-1/2 top-[48px] w-[473px]" data-name="Heading 1">
      <p className="-translate-x-1/2 absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[33px] left-[236.55px] text-[#fff2ed] text-[22px] text-center top-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Good evening, John
      </p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="-translate-x-1/2 absolute h-[19.5px] left-1/2 top-[85px] w-[473px]" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[19.5px] left-[236.91px] text-[#c7b8b2] text-[13px] text-center top-0 whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Rally AI is ready. What would you like to do today?
      </p>
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute h-[105px] left-[20px] right-[20px] top-[32px]" data-name="Container">
      <Container15 />
      <Heading />
      <Paragraph2 />
    </div>
  );
}

function TextArea() {
  return (
    <div className="content-stretch flex h-[21px] items-start overflow-clip py-[4px] relative shrink-0 w-full" data-name="Text Area">
      <p className="font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[21.125px] relative shrink-0 text-[#c7b8b2] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Ask anything — or pick a prompt below…
      </p>
    </div>
  );
}

function Container16() {
  return (
    <div className="h-[44px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pt-[8px] px-[16px] relative size-full">
        <TextArea />
      </div>
    </div>
  );
}

function Icon20() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M3.33333 8H12.6667" id="Vector" stroke="var(--stroke-0, #C7B8B2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 3.33333V12.6667" id="Vector_2" stroke="var(--stroke-0, #C7B8B2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button7() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[32px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[8px] relative size-full">
        <Icon20 />
      </div>
    </div>
  );
}

function Container18() {
  return <div className="flex-[239_0_0] h-0 min-w-px relative" data-name="Container" />;
}

function Icon21() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p2e68c600} id="Vector" stroke="var(--stroke-0, #C7B8B2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p4f72080} id="Vector_2" stroke="var(--stroke-0, #C7B8B2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 12.6667V14.6667" id="Vector_3" stroke="var(--stroke-0, #C7B8B2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button8() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[32px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[8px] relative size-full">
        <Icon21 />
      </div>
    </div>
  );
}

function Icon22() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_518_298)" id="Icon">
          <path d={svgPaths.p22f0380} id="Vector" stroke="var(--stroke-0, #8A807C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M14.5693 1.43133L7.276 8.724" id="Vector_2" stroke="var(--stroke-0, #8A807C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_518_298">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button9() {
  return (
    <div className="bg-[#262322] relative rounded-[8px] shrink-0 size-[32px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[8px] relative size-full">
        <Icon22 />
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] items-center pb-[8px] px-[8px] relative size-full">
          <Button7 />
          <Container18 />
          <Button8 />
          <Button9 />
        </div>
      </div>
    </div>
  );
}

function Composer() {
  return (
    <div className="absolute bg-[#2c2c2c] content-stretch drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)] flex flex-col h-[85px] items-start left-[20px] p-px right-[20px] rounded-[14px] top-[157px]" data-name="Composer">
      <div aria-hidden="true" className="absolute border border-[#4a403c] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Container16 />
      <Container17 />
    </div>
  );
}

function Text8() {
  return (
    <div className="-translate-y-1/2 absolute h-[17px] left-[40px] top-1/2 w-[29px]" data-name="Text">
      <p className="absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[16.5px] left-0 text-[12px] text-[rgba(255,255,255,0.7)] top-0 w-[139px]" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        chats
      </p>
    </div>
  );
}

function Icon23() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 13.3334">
            <path d={svgPaths.p3bd79540} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-start left-[14px] size-[16px] top-[calc(50%+0.5px)]" data-name="Container">
      <Icon23 />
    </div>
  );
}

function Button10() {
  return (
    <div className="-translate-y-1/2 absolute border border-[rgba(255,255,255,0.11)] border-solid h-[37px] left-[426px] rounded-[10px] top-[calc(50%-5px)] w-[85px]" data-name="Button">
      <Text8 />
      <Container20 />
    </div>
  );
}

function Text9() {
  return (
    <div className="-translate-y-1/2 absolute h-[17px] left-[40px] top-1/2 w-[29px]" data-name="Text">
      <p className="absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[16.5px] left-0 text-[12px] text-[rgba(255,255,255,0.7)] top-0 w-[139px]" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        chats
      </p>
    </div>
  );
}

function Icon24() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 13.3334">
            <path d={svgPaths.p3bd79540} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-start left-[14px] size-[16px] top-[calc(50%+0.5px)]" data-name="Container">
      <Icon24 />
    </div>
  );
}

function Button11() {
  return (
    <div className="-translate-y-1/2 absolute border border-[rgba(255,255,255,0.11)] border-solid h-[37px] left-[126px] rounded-[10px] top-[calc(50%-5px)] w-[85px]" data-name="Button">
      <Text9 />
      <Container21 />
    </div>
  );
}

function Text10() {
  return (
    <div className="-translate-y-1/2 absolute h-[17px] left-[40px] top-1/2 w-[29px]" data-name="Text">
      <p className="absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[16.5px] left-0 text-[12px] text-[rgba(255,255,255,0.7)] top-0 w-[139px]" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        chats
      </p>
    </div>
  );
}

function Icon25() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 13.3334">
            <path d={svgPaths.p3bd79540} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-start left-[14px] size-[16px] top-[calc(50%+0.5px)]" data-name="Container">
      <Icon25 />
    </div>
  );
}

function Button12() {
  return (
    <div className="-translate-y-1/2 absolute border border-[rgba(255,255,255,0.11)] border-solid h-[37px] left-[226px] rounded-[10px] top-[calc(50%-5px)] w-[85px]" data-name="Button">
      <Text10 />
      <Container22 />
    </div>
  );
}

function Text11() {
  return (
    <div className="-translate-y-1/2 absolute h-[17px] left-[40px] top-1/2 w-[29px]" data-name="Text">
      <p className="absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[16.5px] left-0 text-[12px] text-[rgba(255,255,255,0.7)] top-0 w-[139px]" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        chats
      </p>
    </div>
  );
}

function Icon26() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 13.3334">
            <path d={svgPaths.p3bd79540} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-start left-[14px] size-[16px] top-[calc(50%+0.5px)]" data-name="Container">
      <Icon26 />
    </div>
  );
}

function Button13() {
  return (
    <div className="-translate-y-1/2 absolute border border-[rgba(255,255,255,0.11)] border-solid h-[37px] left-[326px] rounded-[10px] top-[calc(50%-5px)] w-[85px]" data-name="Button">
      <Text11 />
      <Container23 />
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute h-[59px] left-0 right-0 top-0" data-name="Container">
      <Button10 />
      <Button11 />
      <Button12 />
      <Button13 />
    </div>
  );
}

function Section2() {
  return (
    <div className="absolute h-[59px] left-[20px] right-[20px] top-[262px]" data-name="Section">
      <Container19 />
    </div>
  );
}

function Container13() {
  return (
    <div className="h-[321px] relative shrink-0 w-full" data-name="Container">
      <Container14 />
      <Composer />
      <Section2 />
    </div>
  );
}

function AiHome() {
  return (
    <div className="content-stretch flex flex-col h-[789px] items-center justify-center overflow-clip relative shrink-0 w-full" data-name="AIHome">
      <Container13 />
    </div>
  );
}

function MainContent1() {
  return (
    <div className="flex-[513_0_0] h-[789px] min-w-px relative" data-name="Main Content">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <AiHome />
      </div>
    </div>
  );
}

function AiChatV() {
  return (
    <div className="bg-[#232323] content-stretch flex h-[789px] items-start overflow-clip relative shrink-0 w-full" data-name="AIChatV2">
      <AiSidebar />
      <MainContent1 />
    </div>
  );
}

function MainContent() {
  return (
    <div className="bg-[#232323] flex-[989_0_0] h-[789px] min-w-px relative rounded-[16px] shadow-[0px_0px_0px_1px_#4a403c]" data-name="Main Content">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <AiChatV />
      </div>
    </div>
  );
}

function LayoutInner() {
  return (
    <div className="absolute bg-[#232323] content-stretch flex gap-[12px] h-[813px] items-start left-0 overflow-clip p-[12px] top-0 w-[1099px]" data-name="LayoutInner">
      <Sidebar />
      <MainContent />
    </div>
  );
}

export default function Rally() {
  return (
    <div className="bg-[#232323] relative size-full" data-name="Rally">
      <LayoutInner />
    </div>
  );
}