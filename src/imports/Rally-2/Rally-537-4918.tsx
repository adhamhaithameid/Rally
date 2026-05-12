import svgPaths from "./svg-rlse2nzlqr";
import { imgGroup } from "./svg-zkc9m";

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
            <path d={svgPaths.p12f93600} id="Vector" stroke="var(--stroke-0, #FF9571)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[8.34%_12.5%_12.5%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.26%_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6667 17.4996">
            <path d={svgPaths.p29aa3400} id="Vector" stroke="var(--stroke-0, #FF9571)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[18px] size-[20px] top-[10px]" data-name="Container">
      <Icon1 />
    </div>
  );
}

function Text1() {
  return (
    <div className="absolute h-[12.5px] left-[4px] overflow-clip top-[34px] w-[48px]" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[12.5px] left-[24.34px] text-[#8a807c] text-[10px] text-center top-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Home
      </p>
    </div>
  );
}

function Link() {
  return (
    <div className="absolute bg-[#440608] h-[56.5px] left-0 rounded-[16px] top-0 w-[56px]" data-name="Link">
      <Container2 />
      <Text1 />
    </div>
  );
}

function ListItem() {
  return (
    <div className="bg-[#440608] h-[56.5px] relative rounded-[16px] shrink-0 w-full" data-name="List Item">
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

function Container3() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[18px] size-[20px] top-[10px]" data-name="Container">
      <Icon2 />
    </div>
  );
}

function Text2() {
  return (
    <div className="absolute h-[12.5px] left-[4px] overflow-clip top-[34px] w-[48px]" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[12.5px] left-[24.25px] text-[#8a807c] text-[10px] text-center top-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Chat
      </p>
    </div>
  );
}

function Link1() {
  return (
    <div className="absolute h-[56.5px] left-0 rounded-[16px] top-0 w-[56px]" data-name="Link">
      <Container3 />
      <Text2 />
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
            <path d={svgPaths.p320b1d00} id="Vector" stroke="var(--stroke-0, #FFF2ED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[33.33%_16.67%_16.67%_16.67%]" data-name="Vector">
        <div className="absolute inset-[-8.33%_-6.25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 11.6667">
            <path d={svgPaths.p2b6eb300} id="Vector" stroke="var(--stroke-0, #FFF2ED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[58.33%_83.33%_41.67%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-0.83px_-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.33333 1.66667">
            <path d="M0.833333 0.833333H2.5" id="Vector" stroke="var(--stroke-0, #FFF2ED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[58.33%_8.33%_41.67%_83.33%]" data-name="Vector">
        <div className="absolute inset-[-0.83px_-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.33333 1.66667">
            <path d="M0.833333 0.833333H2.5" id="Vector" stroke="var(--stroke-0, #FFF2ED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[54.17%_37.5%_37.5%_62.5%]" data-name="Vector">
        <div className="absolute inset-[-50%_-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.66667 3.33333">
            <path d="M0.833333 0.833333V2.5" id="Vector" stroke="var(--stroke-0, #FFF2ED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[54.17%_62.5%_37.5%_37.5%]" data-name="Vector">
        <div className="absolute inset-[-50%_-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.66667 3.33333">
            <path d="M0.833333 0.833333V2.5" id="Vector" stroke="var(--stroke-0, #FFF2ED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[18px] size-[20px] top-[10px]" data-name="Container">
      <Icon3 />
    </div>
  );
}

function Text3() {
  return (
    <div className="absolute h-[12.5px] left-[4px] overflow-clip top-[34px] w-[48px]" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[12.5px] left-[24.23px] text-[#8a807c] text-[10px] text-center top-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        AI Chat
      </p>
    </div>
  );
}

function Link2() {
  return (
    <div className="absolute h-[56.5px] left-0 rounded-[16px] top-0 w-[56px]" data-name="Link">
      <Container4 />
      <Text3 />
    </div>
  );
}

function ListItem2() {
  return (
    <div className="h-[56.5px] relative shrink-0 w-full" data-name="List Item">
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

function Container5() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[18px] size-[20px] top-[10px]" data-name="Container">
      <Icon4 />
    </div>
  );
}

function Text4() {
  return (
    <div className="absolute h-[12.5px] left-[4px] overflow-clip top-[34px] w-[48px]" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[12.5px] left-[24.35px] text-[#8a807c] text-[10px] text-center top-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        To-Do
      </p>
    </div>
  );
}

function Link3() {
  return (
    <div className="absolute h-[56.5px] left-0 rounded-[16px] top-0 w-[56px]" data-name="Link">
      <Container5 />
      <Text4 />
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

function Container6() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[18px] size-[20px] top-[10px]" data-name="Container">
      <Icon5 />
    </div>
  );
}

function Text5() {
  return (
    <div className="absolute h-[12.5px] left-[4px] overflow-clip top-[34px] w-[48px]" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[12.5px] left-[24.03px] text-[#8a807c] text-[10px] text-center top-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Calendar
      </p>
    </div>
  );
}

function Link4() {
  return (
    <div className="absolute h-[56.5px] left-0 rounded-[16px] top-0 w-[56px]" data-name="Link">
      <Container6 />
      <Text5 />
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

function Container7() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[18px] size-[20px] top-[10px]" data-name="Container">
      <Icon6 />
    </div>
  );
}

function Text6() {
  return (
    <div className="absolute h-[12.5px] left-[4px] overflow-clip top-[34px] w-[48px]" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[12.5px] left-[24.41px] text-[#8a807c] text-[10px] text-center top-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Files
      </p>
    </div>
  );
}

function Link5() {
  return (
    <div className="absolute h-[56.5px] left-0 rounded-[16px] top-0 w-[56px]" data-name="Link">
      <Container7 />
      <Text6 />
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

function Container8() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[18px] size-[20px] top-[10px]" data-name="Container">
      <Icon7 />
    </div>
  );
}

function Text7() {
  return (
    <div className="absolute h-[12.5px] left-[4px] overflow-clip top-[34px] w-[48px]" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[12.5px] left-[24.09px] text-[#8a807c] text-[10px] text-center top-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Team
      </p>
    </div>
  );
}

function Link6() {
  return (
    <div className="absolute h-[56.5px] left-0 rounded-[16px] top-0 w-[56px]" data-name="Link">
      <Container8 />
      <Text7 />
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

function Container9() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[18px] size-[20px] top-[10px]" data-name="Container">
      <Icon8 />
    </div>
  );
}

function Text8() {
  return (
    <div className="absolute h-[12.5px] left-[4px] overflow-clip top-[34px] w-[48px]" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[12.5px] left-[24.45px] text-[#8a807c] text-[10px] text-center top-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        System
      </p>
    </div>
  );
}

function Link7() {
  return (
    <div className="absolute h-[56.5px] left-0 rounded-[16px] top-0 w-[56px]" data-name="Link">
      <Container9 />
      <Text8 />
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

function Container10() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[18px] size-[20px] top-[10px]" data-name="Container">
      <Icon9 />
    </div>
  );
}

function Text9() {
  return (
    <div className="absolute h-[12.5px] left-[4px] overflow-clip top-[34px] w-[48px]" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[12.5px] left-[24.19px] text-[#8a807c] text-[10px] text-center top-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Themes
      </p>
    </div>
  );
}

function Link8() {
  return (
    <div className="absolute h-[56.5px] left-0 rounded-[16px] top-0 w-[56px]" data-name="Link">
      <Container10 />
      <Text9 />
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

function Container11() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[18px] size-[20px] top-[10px]" data-name="Container">
      <Icon10 />
    </div>
  );
}

function Text10() {
  return (
    <div className="absolute h-[12.5px] left-[4px] overflow-clip top-[34px] w-[48px]" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[12.5px] left-[24.24px] text-[#8a807c] text-[10px] text-center top-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Elements
      </p>
    </div>
  );
}

function Link9() {
  return (
    <div className="absolute h-[56.5px] left-0 rounded-[16px] top-0 w-[56px]" data-name="Link">
      <Container11 />
      <Text10 />
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

function Text11() {
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
          <Text11 />
        </div>
      </div>
    </div>
  );
}

function Text12() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-[3.977px]" data-name="Text">
      <p className="font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[16px] relative shrink-0 text-[12px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        J
      </p>
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute bg-[#ff4615] content-stretch flex items-center justify-center left-[14px] pl-[12.008px] pr-[12.016px] rounded-[16777200px] size-[28px] top-[10px]" data-name="Container">
      <Text12 />
    </div>
  );
}

function Text13() {
  return (
    <div className="absolute h-[12.5px] left-[4px] overflow-clip top-[42px] w-[48px]" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[12.5px] left-[24.01px] text-[#8a807c] text-[10px] text-center top-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Profile
      </p>
    </div>
  );
}

function Link10() {
  return (
    <div className="h-[64.5px] relative rounded-[16px] shrink-0 w-full" data-name="Link">
      <Container13 />
      <Text13 />
    </div>
  );
}

function Container12() {
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
        <Container12 />
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

function Heading() {
  return (
    <div className="h-[33px] relative shrink-0 w-full" data-name="Heading 1">
      <p className="absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[33px] left-0 text-[#fff2ed] text-[22px] top-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Good afternoon, John 👋
      </p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[19.5px] left-0 text-[#c7b8b2] text-[13px] top-0 whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Design Team · Website Redesign · Sunday, May 10
      </p>
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[54.5px] items-start left-0 top-[1.5px] w-[294.602px]" data-name="Container">
      <Heading />
      <Paragraph />
    </div>
  );
}

function Icon12() {
  return (
    <div className="absolute left-[12px] size-[14px] top-[10px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p3fb08a80} id="Vector" stroke="var(--stroke-0, #C7B8B2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M12.25 1.75V4.66667H9.33333" id="Vector_2" stroke="var(--stroke-0, #C7B8B2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p32253d00} id="Vector_3" stroke="var(--stroke-0, #C7B8B2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M4.66667 9.33333H1.75V12.25" id="Vector_4" stroke="var(--stroke-0, #C7B8B2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute bg-[#232323] border border-[#4a403c] border-solid h-[36px] left-[833.33px] rounded-[10px] top-0 w-[115.672px]" data-name="Button">
      <Icon12 />
      <p className="-translate-x-1/2 absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[18px] left-[67.5px] text-[#c7b8b2] text-[12px] text-center top-[8px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>{` Refresh brief`}</p>
    </div>
  );
}

function Container16() {
  return (
    <div className="h-[56px] relative shrink-0 w-full" data-name="Container">
      <Container17 />
      <Button1 />
    </div>
  );
}

function Icon13() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_491_1166)" id="Icon">
          <path d={svgPaths.p874e300} id="Vector" stroke="var(--stroke-0, #FF4615)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M13.3333 2V4.66667" id="Vector_2" stroke="var(--stroke-0, #FF4615)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M14.6667 3.33333H12" id="Vector_3" stroke="var(--stroke-0, #FF4615)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M2.66667 11.3333V12.6667" id="Vector_4" stroke="var(--stroke-0, #FF4615)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M3.33333 12H2" id="Vector_5" stroke="var(--stroke-0, #FF4615)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_491_1166">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text14() {
  return (
    <div className="flex-[529.25_0_0] h-[21px] min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[21px] left-0 text-[#fff2ed] text-[14px] top-0 whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
          AI Daily Brief
        </p>
      </div>
    </div>
  );
}

function Icon14() {
  return (
    <div className="absolute left-[45.75px] size-[12px] top-[2.25px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M2.5 6H9.5" id="Vector" stroke="var(--stroke-0, #C7B8B2)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 2.5L9.5 6L6 9.5" id="Vector_2" stroke="var(--stroke-0, #C7B8B2)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[57.75px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[16.5px] left-[21px] text-[#c7b8b2] text-[11px] text-center top-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>{`Open AI `}</p>
        <Icon14 />
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="h-[50px] relative shrink-0 w-[651px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.06)] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center pb-[13px] pt-[16px] px-[16px] relative size-full">
        <Icon13 />
        <Text14 />
        <Button2 />
      </div>
    </div>
  );
}

function Icon15() {
  return (
    <div className="absolute left-[12px] size-[16px] top-[14px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_491_1090)" id="Icon">
          <path d={svgPaths.p39ee6532} id="Vector" stroke="var(--stroke-0, #FFD08A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 4V8L10.6667 9.33333" id="Vector_2" stroke="var(--stroke-0, #FFD08A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_491_1090">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="content-stretch flex h-[16.5px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[16.5px] min-w-px relative text-[#fff2ed] text-[12px]" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        2 tasks are due today
      </p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="content-stretch flex h-[15.125px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[15.125px] relative shrink-0 text-[#c7b8b2] text-[11px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Review prototype + weekly report
      </p>
    </div>
  );
}

function Container24() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[33.625px] items-start left-[38px] top-[12px] w-[171.586px]" data-name="Container">
      <Paragraph1 />
      <Paragraph2 />
    </div>
  );
}

function Container23() {
  return (
    <div className="absolute bg-[#232323] border border-[#4a403c] border-solid h-[59.625px] left-0 rounded-[10px] top-0 w-[305.5px]" data-name="Container">
      <Icon15 />
      <Container24 />
    </div>
  );
}

function Icon16() {
  return (
    <div className="absolute left-[12px] size-[16px] top-[14px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M5.33333 1.33333V4" id="Vector" stroke="var(--stroke-0, #A9CBFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10.6667 1.33333V4" id="Vector_2" stroke="var(--stroke-0, #A9CBFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3ee34580} id="Vector_3" stroke="var(--stroke-0, #A9CBFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M2 6.66667H14" id="Vector_4" stroke="var(--stroke-0, #A9CBFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="content-stretch flex h-[16.5px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[16.5px] relative shrink-0 text-[#fff2ed] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        1 meeting in 40 minutes
      </p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="content-stretch flex h-[15.125px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[15.125px] min-w-px relative text-[#c7b8b2] text-[11px]" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Client review at 2:00 PM
      </p>
    </div>
  );
}

function Container26() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[33.625px] items-start left-[38px] top-[12px] w-[131.297px]" data-name="Container">
      <Paragraph3 />
      <Paragraph4 />
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute bg-[#232323] border border-[#4a403c] border-solid h-[59.625px] left-[313.5px] rounded-[10px] top-0 w-[305.5px]" data-name="Container">
      <Icon16 />
      <Container26 />
    </div>
  );
}

function Icon17() {
  return (
    <div className="absolute left-[12px] size-[16px] top-[14px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p1bb15080} id="Vector" stroke="var(--stroke-0, #FF9571)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="content-stretch flex h-[16.5px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[16.5px] relative shrink-0 text-[#fff2ed] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        3 unread mentions
      </p>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="content-stretch flex h-[15.125px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[15.125px] min-w-px relative text-[#c7b8b2] text-[11px]" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Sarah, Mike, Emily
      </p>
    </div>
  );
}

function Container28() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[33.625px] items-start left-[38px] top-[12px] w-[101.375px]" data-name="Container">
      <Paragraph5 />
      <Paragraph6 />
    </div>
  );
}

function Container27() {
  return (
    <div className="absolute bg-[#232323] border border-[#4a403c] border-solid h-[59.625px] left-0 rounded-[10px] top-[67.63px] w-[305.5px]" data-name="Container">
      <Icon17 />
      <Container28 />
    </div>
  );
}

function Icon18() {
  return (
    <div className="absolute left-[12px] size-[16px] top-[14px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p19416e00} id="Vector" stroke="var(--stroke-0, #7AD6A7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3e059a80} id="Vector_2" stroke="var(--stroke-0, #7AD6A7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6.66667 6H5.33333" id="Vector_3" stroke="var(--stroke-0, #7AD6A7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10.6667 8.66667H5.33333" id="Vector_4" stroke="var(--stroke-0, #7AD6A7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10.6667 11.3333H5.33333" id="Vector_5" stroke="var(--stroke-0, #7AD6A7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="content-stretch flex h-[16.5px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[16.5px] min-w-px relative text-[#fff2ed] text-[12px]" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Launch brief was updated
      </p>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="content-stretch flex h-[15.125px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[15.125px] relative shrink-0 text-[#c7b8b2] text-[11px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Q2 Launch Brief.pdf — Mike Chen, 2h ago
      </p>
    </div>
  );
}

function Container30() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[33.625px] items-start left-[38px] top-[12px] w-[210.695px]" data-name="Container">
      <Paragraph7 />
      <Paragraph8 />
    </div>
  );
}

function Container29() {
  return (
    <div className="absolute bg-[#232323] border border-[#4a403c] border-solid h-[59.625px] left-[313.5px] rounded-[10px] top-[67.63px] w-[305.5px]" data-name="Container">
      <Icon18 />
      <Container30 />
    </div>
  );
}

function Container22() {
  return (
    <div className="h-[127.25px] relative shrink-0 w-full" data-name="Container">
      <Container23 />
      <Container25 />
      <Container27 />
      <Container29 />
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[16.5px] left-0 text-[#c7b8b2] text-[11px] top-[-0.5px] tracking-[1.1px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Suggested actions
      </p>
    </div>
  );
}

function Text15() {
  return (
    <div className="h-[18px] relative shrink-0 w-[225.258px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[18px] left-0 text-[#fff2ed] text-[12px] top-0 whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
          Summarize what changed since yesterday
        </p>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="absolute bg-[#232323] content-stretch flex h-[32px] items-center left-0 pl-[13px] pr-[9px] py-[7px] rounded-[16777200px] top-0 w-[265.258px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#4a403c] border-solid inset-0 pointer-events-none rounded-[16777200px]" />
      <Text15 />
    </div>
  );
}

function Text16() {
  return (
    <div className="h-[18px] relative shrink-0 w-[167.531px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[18px] left-0 text-[#fff2ed] text-[12px] top-0 whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>{`Turn today's meeting into tasks`}</p>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="absolute bg-[#232323] content-stretch flex h-[32px] items-center left-[273.26px] pl-[13px] pr-[9px] py-[7px] rounded-[16777200px] top-0 w-[207.531px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#4a403c] border-solid inset-0 pointer-events-none rounded-[16777200px]" />
      <Text16 />
    </div>
  );
}

function Container35() {
  return (
    <div className="absolute bg-[#232323] content-stretch flex h-[32px] items-center left-0 pl-[13px] pr-[9px] py-[7px] rounded-[16777200px] top-[40px] w-[164.93px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#4a403c] border-solid inset-0 pointer-events-none rounded-[16777200px]" />
      <p className="font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[#fff2ed] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Draft my plan for today
      </p>
    </div>
  );
}

function Text17() {
  return (
    <div className="h-[18px] relative shrink-0 w-[159.219px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[18px] left-0 text-[#fff2ed] text-[12px] top-0 whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
          Find the latest file from Sarah
        </p>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="absolute bg-[#232323] content-stretch flex h-[32px] items-center left-[172.93px] pl-[13px] pr-[9px] py-[7px] rounded-[16777200px] top-[40px] w-[199.219px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#4a403c] border-solid inset-0 pointer-events-none rounded-[16777200px]" />
      <Text17 />
    </div>
  );
}

function Container32() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Container">
      <Container33 />
      <Container34 />
      <Container35 />
      <Container36 />
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[96.5px] items-start relative shrink-0 w-full" data-name="Container">
      <Paragraph9 />
      <Container32 />
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[0] left-0 text-[#c7b8b2] text-[10px] top-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <span className="leading-[15px]">{`AI suggestions require confirmation before executing. `}</span>
        <span className="[text-decoration-skip-ink:none] decoration-solid leading-[15px] underline">Manage AI settings</span>
      </p>
    </div>
  );
}

function Container21() {
  return (
    <div className="flex-[294.75_0_0] min-h-px relative w-[651px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[12px] items-start pt-[16px] px-[16px] relative size-full">
        <Container22 />
        <Container31 />
        <Paragraph10 />
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute bg-[#2c2c2c] h-[346.75px] left-0 rounded-[14px] top-0 w-[653px]" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <Container20 />
        <Container21 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#4a403c] border-solid inset-0 pointer-events-none rounded-[14px]" />
    </div>
  );
}

function Icon19() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p1d59db00} id="Vector" stroke="var(--stroke-0, #FF4615)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text18() {
  return (
    <div className="flex-[222_0_0] h-[21px] min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[21px] left-0 text-[#fff2ed] text-[14px] top-0 whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
          Quick Actions
        </p>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="h-[50px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.06)] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center pb-[13px] pt-[16px] px-[16px] relative size-full">
          <Icon19 />
          <Text18 />
        </div>
      </div>
    </div>
  );
}

function Icon20() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p299d1200} id="Vector" stroke="var(--stroke-0, #A9CBFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1f2c5400} id="Vector_2" stroke="var(--stroke-0, #A9CBFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container40() {
  return (
    <div className="bg-[#101d36] relative rounded-[8px] shrink-0 size-[28px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[6px] relative size-full">
        <Icon20 />
      </div>
    </div>
  );
}

function Text19() {
  return (
    <div className="flex-[1_0_0] h-[42px] min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[21px] left-0 text-[#fff2ed] text-[14px] top-0 w-[55px]" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
          Create Task
        </p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute bg-[#232323] content-stretch flex gap-[10px] h-[68px] items-center left-[16px] p-[13px] rounded-[10px] top-[16px] w-[119px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#4a403c] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container40 />
      <Text19 />
    </div>
  );
}

function Icon21() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p23ad1400} id="Vector" stroke="var(--stroke-0, #7AD6A7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p26e09a00} id="Vector_2" stroke="var(--stroke-0, #7AD6A7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 2V10" id="Vector_3" stroke="var(--stroke-0, #7AD6A7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container41() {
  return (
    <div className="bg-[#10261c] relative rounded-[8px] shrink-0 size-[28px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[6px] relative size-full">
        <Icon21 />
      </div>
    </div>
  );
}

function Text20() {
  return (
    <div className="flex-[1_0_0] h-[42px] min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[21px] left-0 text-[#fff2ed] text-[14px] top-0 w-[55px]" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
          Upload File
        </p>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="absolute bg-[#232323] content-stretch flex gap-[10px] h-[68px] items-center left-[143px] p-[13px] rounded-[10px] top-[16px] w-[119px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#4a403c] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container41 />
      <Text20 />
    </div>
  );
}

function Icon22() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M5.33333 1.33333V4" id="Vector" stroke="var(--stroke-0, #FFD08A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10.6667 1.33333V4" id="Vector_2" stroke="var(--stroke-0, #FFD08A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3ee34580} id="Vector_3" stroke="var(--stroke-0, #FFD08A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M2 6.66667H14" id="Vector_4" stroke="var(--stroke-0, #FFD08A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container42() {
  return (
    <div className="bg-[#33210a] relative rounded-[8px] shrink-0 size-[28px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[6px] relative size-full">
        <Icon22 />
      </div>
    </div>
  );
}

function Text21() {
  return (
    <div className="flex-[1_0_0] h-[42px] min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[21px] left-0 text-[#fff2ed] text-[14px] top-0 w-[55px]" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
          New Event
        </p>
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="absolute bg-[#232323] content-stretch flex gap-[10px] h-[68px] items-center left-[16px] p-[13px] rounded-[10px] top-[92px] w-[119px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#4a403c] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container42 />
      <Text21 />
    </div>
  );
}

function Icon23() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M8 5.33333V2.66667H5.33333" id="Vector" stroke="var(--stroke-0, #FF9571)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1ed63c00} id="Vector_2" stroke="var(--stroke-0, #FF9571)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M1.33333 9.33333H2.66667" id="Vector_3" stroke="var(--stroke-0, #FF9571)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M13.3333 9.33333H14.6667" id="Vector_4" stroke="var(--stroke-0, #FF9571)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10 8.66667V10" id="Vector_5" stroke="var(--stroke-0, #FF9571)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6 8.66667V10" id="Vector_6" stroke="var(--stroke-0, #FF9571)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container43() {
  return (
    <div className="bg-[#440608] relative rounded-[8px] shrink-0 size-[28px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[6px] relative size-full">
        <Icon23 />
      </div>
    </div>
  );
}

function Text22() {
  return (
    <div className="h-[21px] relative shrink-0 w-[52.063px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[21px] left-0 text-[#fff2ed] text-[14px] top-0 whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
          Open AI
        </p>
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div className="absolute bg-[#232323] content-stretch flex gap-[10px] h-[68px] items-center left-[143px] p-[13px] rounded-[10px] top-[92px] w-[119px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#4a403c] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container43 />
      <Text22 />
    </div>
  );
}

function Icon24() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p1bb15080} id="Vector" stroke="var(--stroke-0, #C7B8B2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container44() {
  return (
    <div className="bg-[#262322] relative rounded-[8px] shrink-0 size-[28px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[6px] relative size-full">
        <Icon24 />
      </div>
    </div>
  );
}

function Text23() {
  return (
    <div className="flex-[1_0_0] h-[42px] min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[21px] left-0 text-[#fff2ed] text-[14px] top-0 w-[55px]" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
          Start Chat
        </p>
      </div>
    </div>
  );
}

function Button7() {
  return (
    <div className="absolute bg-[#232323] content-stretch flex gap-[10px] h-[68px] items-center left-[16px] p-[13px] rounded-[10px] top-[168px] w-[119px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#4a403c] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container44 />
      <Text23 />
    </div>
  );
}

function Icon25() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p144f51c0} id="Vector" stroke="var(--stroke-0, #A9CBFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1e94b080} id="Vector_2" stroke="var(--stroke-0, #A9CBFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container45() {
  return (
    <div className="bg-[#101d36] relative rounded-[8px] shrink-0 size-[28px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[6px] relative size-full">
        <Icon25 />
      </div>
    </div>
  );
}

function Text24() {
  return (
    <div className="flex-[1_0_0] h-[42px] min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[21px] left-0 text-[#fff2ed] text-[14px] top-0 w-[55px]" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
          Join Voice
        </p>
      </div>
    </div>
  );
}

function Button8() {
  return (
    <div className="absolute bg-[#232323] content-stretch flex gap-[10px] h-[68px] items-center left-[143px] p-[13px] rounded-[10px] top-[168px] w-[119px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#4a403c] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container45 />
      <Text24 />
    </div>
  );
}

function Container39() {
  return (
    <div className="h-[252px] relative shrink-0 w-full" data-name="Container">
      <Button3 />
      <Button4 />
      <Button5 />
      <Button6 />
      <Button7 />
      <Button8 />
    </div>
  );
}

function Container37() {
  return (
    <div className="absolute bg-[#2c2c2c] h-[346.75px] left-[669px] rounded-[14px] top-0 w-[280px]" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <Container38 />
        <Container39 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#4a403c] border-solid inset-0 pointer-events-none rounded-[14px]" />
    </div>
  );
}

function Container18() {
  return (
    <div className="h-[346.75px] relative shrink-0 w-full" data-name="Container">
      <Container19 />
      <Container37 />
    </div>
  );
}

function Icon26() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_491_1047)" id="Icon">
          <path d={svgPaths.p39ee6532} id="Vector" stroke="var(--stroke-0, #0F5FD7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p17134c00} id="Vector_2" stroke="var(--stroke-0, #0F5FD7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_491_1047">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text25() {
  return (
    <div className="flex-[466.867_0_0] h-[21px] min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[21px] left-0 text-[#fff2ed] text-[14px] top-0 whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
          My Work Now
        </p>
      </div>
    </div>
  );
}

function Icon27() {
  return (
    <div className="absolute left-[48.13px] size-[12px] top-[2.25px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M2.5 6H9.5" id="Vector" stroke="var(--stroke-0, #C7B8B2)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 2.5L9.5 6L6 9.5" id="Vector_2" stroke="var(--stroke-0, #C7B8B2)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Link11() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[60.133px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[16.5px] left-0 text-[#c7b8b2] text-[11px] top-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>{`All tasks `}</p>
        <Icon27 />
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="h-[50px] relative shrink-0 w-[591px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.06)] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center pb-[13px] pt-[16px] px-[16px] relative size-full">
        <Icon26 />
        <Text25 />
        <Link11 />
      </div>
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[15px] left-0 text-[#c7b8b2] text-[10px] top-[-0.5px] tracking-[1px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Overdue
      </p>
    </div>
  );
}

function Icon28() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6667 14.6667">
            <path d={svgPaths.p3d62dd80} id="Vector" stroke="var(--stroke-0, #C7B8B2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button9() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[13px] size-[16px] top-[13px]" data-name="Button">
      <Icon28 />
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="content-stretch flex h-[19.25px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[19.25px] min-w-px relative text-[#fff2ed] text-[14px]" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Update landing page copy
      </p>
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[16.5px] left-0 text-[#c7b8b2] text-[11px] top-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        2 days overdue
      </p>
    </div>
  );
}

function Container52() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[37.75px] items-start left-[41px] top-[11px] w-[409.563px]" data-name="Container">
      <Paragraph12 />
      <Paragraph13 />
    </div>
  );
}

function Text26() {
  return (
    <div className="bg-[#341111] h-[20.5px] relative rounded-[16777200px] shrink-0 w-[59.438px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[8px] py-[2px] relative size-full">
        <p className="font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[16.5px] relative shrink-0 text-[#ff8a8a] text-[11px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
          Overdue
        </p>
      </div>
    </div>
  );
}

function Container53() {
  return (
    <div className="absolute content-stretch flex h-[20.5px] items-center left-[462.56px] top-[11px] w-[83.438px]" data-name="Container">
      <Text26 />
    </div>
  );
}

function Container51() {
  return (
    <div className="bg-[#232323] h-[59.75px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#4a403c] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Button9 />
      <Container52 />
      <Container53 />
    </div>
  );
}

function Container50() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[82.75px] items-start relative shrink-0 w-full" data-name="Container">
      <Paragraph11 />
      <Container51 />
    </div>
  );
}

function Paragraph14() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[15px] left-0 text-[#c7b8b2] text-[10px] top-[-0.5px] tracking-[1px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Due Today
      </p>
    </div>
  );
}

function Icon29() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6667 14.6667">
            <path d={svgPaths.p3d62dd80} id="Vector" stroke="var(--stroke-0, #C7B8B2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button10() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[13px] size-[16px] top-[13px]" data-name="Button">
      <Icon29 />
    </div>
  );
}

function Paragraph15() {
  return (
    <div className="content-stretch flex h-[19.25px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[19.25px] min-w-px relative text-[#fff2ed] text-[14px]" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Review Figma prototype
      </p>
    </div>
  );
}

function Paragraph16() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[16.5px] left-0 text-[#c7b8b2] text-[11px] top-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Due today
      </p>
    </div>
  );
}

function Container57() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[37.75px] items-start left-[41px] top-[11px] w-[400.594px]" data-name="Container">
      <Paragraph15 />
      <Paragraph16 />
    </div>
  );
}

function Text27() {
  return (
    <div className="bg-[#33210a] h-[20.5px] relative rounded-[16777200px] shrink-0 w-[68.406px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[8px] py-[2px] relative size-full">
        <p className="font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[16.5px] relative shrink-0 text-[#ffd08a] text-[11px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
          Due today
        </p>
      </div>
    </div>
  );
}

function Container58() {
  return (
    <div className="absolute content-stretch flex h-[20.5px] items-center left-[453.59px] top-[11px] w-[92.406px]" data-name="Container">
      <Text27 />
    </div>
  );
}

function Container56() {
  return (
    <div className="bg-[#232323] h-[59.75px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#4a403c] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Button10 />
      <Container57 />
      <Container58 />
    </div>
  );
}

function Icon30() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6667 14.6667">
            <path d={svgPaths.p3d62dd80} id="Vector" stroke="var(--stroke-0, #C7B8B2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button11() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[13px] size-[16px] top-[13px]" data-name="Button">
      <Icon30 />
    </div>
  );
}

function Paragraph17() {
  return (
    <div className="content-stretch flex h-[19.25px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[19.25px] min-w-px relative text-[#fff2ed] text-[14px]" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Send weekly report to stakeholders
      </p>
    </div>
  );
}

function Paragraph18() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[16.5px] left-0 text-[#c7b8b2] text-[11px] top-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Due today
      </p>
    </div>
  );
}

function Container60() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[37.75px] items-start left-[41px] top-[11px] w-[400.594px]" data-name="Container">
      <Paragraph17 />
      <Paragraph18 />
    </div>
  );
}

function Text28() {
  return (
    <div className="bg-[#33210a] h-[20.5px] relative rounded-[16777200px] shrink-0 w-[68.406px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[8px] py-[2px] relative size-full">
        <p className="font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[16.5px] relative shrink-0 text-[#ffd08a] text-[11px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
          Due today
        </p>
      </div>
    </div>
  );
}

function Container61() {
  return (
    <div className="absolute content-stretch flex h-[20.5px] items-center left-[453.59px] top-[11px] w-[92.406px]" data-name="Container">
      <Text28 />
    </div>
  );
}

function Container59() {
  return (
    <div className="bg-[#232323] h-[59.75px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#4a403c] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Button11 />
      <Container60 />
      <Container61 />
    </div>
  );
}

function Container55() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] h-[125.5px] items-start relative shrink-0 w-full" data-name="Container">
      <Container56 />
      <Container59 />
    </div>
  );
}

function Container54() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[148.5px] items-start relative shrink-0 w-full" data-name="Container">
      <Paragraph14 />
      <Container55 />
    </div>
  );
}

function Paragraph19() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[15px] left-0 text-[#c7b8b2] text-[10px] top-[-0.5px] tracking-[1px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        In Progress
      </p>
    </div>
  );
}

function Icon31() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6667 14.6667">
            <path d={svgPaths.p3d62dd80} id="Vector" stroke="var(--stroke-0, #C7B8B2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button12() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[13px] size-[16px] top-[13px]" data-name="Button">
      <Icon31 />
    </div>
  );
}

function Paragraph20() {
  return (
    <div className="content-stretch flex h-[19.25px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[19.25px] min-w-px relative text-[#fff2ed] text-[14px]" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        API integration spec
      </p>
    </div>
  );
}

function Paragraph21() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[16.5px] left-0 text-[#c7b8b2] text-[11px] top-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Started 2h ago
      </p>
    </div>
  );
}

function Container64() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[37.75px] items-start left-[41px] top-[11px] w-[395.914px]" data-name="Container">
      <Paragraph20 />
      <Paragraph21 />
    </div>
  );
}

function Text29() {
  return (
    <div className="bg-[#101d36] h-[20.5px] relative rounded-[16777200px] shrink-0 w-[73.086px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[8px] py-[2px] relative size-full">
        <p className="font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[16.5px] relative shrink-0 text-[#a9cbff] text-[11px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
          In progress
        </p>
      </div>
    </div>
  );
}

function Container65() {
  return (
    <div className="absolute content-stretch flex h-[20.5px] items-center left-[448.91px] top-[11px] w-[97.086px]" data-name="Container">
      <Text29 />
    </div>
  );
}

function Container63() {
  return (
    <div className="bg-[#232323] h-[59.75px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#4a403c] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Button12 />
      <Container64 />
      <Container65 />
    </div>
  );
}

function Container62() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[82.75px] items-start relative shrink-0 w-full" data-name="Container">
      <Paragraph19 />
      <Container63 />
    </div>
  );
}

function Paragraph22() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[15px] left-0 text-[#c7b8b2] text-[10px] top-[-0.5px] tracking-[1px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Blocked
      </p>
    </div>
  );
}

function Icon32() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6667 14.6667">
            <path d={svgPaths.p3d62dd80} id="Vector" stroke="var(--stroke-0, #C7B8B2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button13() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[13px] size-[16px] top-[13px]" data-name="Button">
      <Icon32 />
    </div>
  );
}

function Paragraph23() {
  return (
    <div className="content-stretch flex h-[19.25px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[19.25px] min-w-px relative text-[#fff2ed] text-[14px]" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Mobile layout approval
      </p>
    </div>
  );
}

function Paragraph24() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[16.5px] left-0 text-[#c7b8b2] text-[11px] top-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Waiting on Emily
      </p>
    </div>
  );
}

function Container68() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[37.75px] items-start left-[41px] top-[11px] w-[412.32px]" data-name="Container">
      <Paragraph23 />
      <Paragraph24 />
    </div>
  );
}

function Text30() {
  return (
    <div className="bg-[#262322] h-[20.5px] relative rounded-[16777200px] shrink-0 w-[56.68px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[8px] py-[2px] relative size-full">
        <p className="font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[16.5px] relative shrink-0 text-[#c7b8b2] text-[11px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
          Blocked
        </p>
      </div>
    </div>
  );
}

function Container69() {
  return (
    <div className="absolute content-stretch flex h-[20.5px] items-center left-[465.32px] top-[11px] w-[80.68px]" data-name="Container">
      <Text30 />
    </div>
  );
}

function Container67() {
  return (
    <div className="bg-[#232323] h-[59.75px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#4a403c] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Button13 />
      <Container68 />
      <Container69 />
    </div>
  );
}

function Container66() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[82.75px] items-start relative shrink-0 w-full" data-name="Container">
      <Paragraph22 />
      <Container67 />
    </div>
  );
}

function Container49() {
  return (
    <div className="flex-[340_0_0] min-h-px relative w-[591px]" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[16px] items-start pt-[16px] px-[16px] relative size-full">
          <Container50 />
          <Container54 />
          <Container62 />
          <Container66 />
        </div>
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="absolute bg-[#2c2c2c] h-[392px] left-0 rounded-[14px] top-0 w-[593px]" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <Container48 />
        <Container49 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#4a403c] border-solid inset-0 pointer-events-none rounded-[14px]" />
    </div>
  );
}

function Icon33() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M5.33333 1.33333V4" id="Vector" stroke="var(--stroke-0, #FFD08A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10.6667 1.33333V4" id="Vector_2" stroke="var(--stroke-0, #FFD08A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3ee34580} id="Vector_3" stroke="var(--stroke-0, #FFD08A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M2 6.66667H14" id="Vector_4" stroke="var(--stroke-0, #FFD08A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text31() {
  return (
    <div className="flex-[211.953_0_0] h-[21px] min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[21px] left-0 text-[#fff2ed] text-[14px] top-0 whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
          Next Up
        </p>
      </div>
    </div>
  );
}

function Icon34() {
  return (
    <div className="absolute left-[50.05px] size-[12px] top-[2.25px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M2.5 6H9.5" id="Vector" stroke="var(--stroke-0, #C7B8B2)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 2.5L9.5 6L6 9.5" id="Vector_2" stroke="var(--stroke-0, #C7B8B2)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Link12() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[62.047px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[16.5px] left-0 text-[#c7b8b2] text-[11px] top-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>{`Calendar `}</p>
        <Icon34 />
      </div>
    </div>
  );
}

function Container71() {
  return (
    <div className="h-[50px] relative shrink-0 w-[338px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.06)] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center pb-[13px] pt-[16px] px-[16px] relative size-full">
        <Icon33 />
        <Text31 />
        <Link12 />
      </div>
    </div>
  );
}

function Paragraph25() {
  return (
    <div className="h-[33px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[16.5px] left-[20px] text-[#fff2ed] text-[11px] text-center top-[-0.5px] w-[40px]" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        10:00 AM
      </p>
    </div>
  );
}

function Paragraph26() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[15px] left-[20.02px] text-[#c7b8b2] text-[10px] text-center top-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        30m
      </p>
    </div>
  );
}

function Container74() {
  return (
    <div className="h-[48px] relative shrink-0 w-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph25 />
        <Paragraph26 />
      </div>
    </div>
  );
}

function Paragraph27() {
  return (
    <div className="content-stretch flex h-[19.25px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[19.25px] min-w-px relative text-[#fff2ed] text-[14px]" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Design standup
      </p>
    </div>
  );
}

function Text32() {
  return (
    <div className="content-stretch flex h-[16px] items-center justify-center relative shrink-0 w-full" data-name="Text">
      <p className="font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[12px] relative shrink-0 text-[8px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        S
      </p>
    </div>
  );
}

function Container78() {
  return (
    <div className="absolute bg-[#5f514b] left-0 rounded-[16777200px] size-[20px] top-0" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[2px] relative rounded-[inherit] size-full">
        <Text32 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#2c2c2c] border-solid inset-0 pointer-events-none rounded-[16777200px]" />
    </div>
  );
}

function Text33() {
  return (
    <div className="content-stretch flex h-[16px] items-center justify-center relative shrink-0 w-full" data-name="Text">
      <p className="font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[12px] relative shrink-0 text-[8px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        M
      </p>
    </div>
  );
}

function Container79() {
  return (
    <div className="absolute bg-[#5f514b] left-[16px] rounded-[16777200px] size-[20px] top-0" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[2px] relative rounded-[inherit] size-full">
        <Text33 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#2c2c2c] border-solid inset-0 pointer-events-none rounded-[16777200px]" />
    </div>
  );
}

function Text34() {
  return (
    <div className="content-stretch flex h-[16px] items-center justify-center relative shrink-0 w-full" data-name="Text">
      <p className="font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[12px] relative shrink-0 text-[8px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        E
      </p>
    </div>
  );
}

function Container80() {
  return (
    <div className="absolute bg-[#5f514b] left-[32px] rounded-[16777200px] size-[20px] top-0" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[2px] relative rounded-[inherit] size-full">
        <Text34 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#2c2c2c] border-solid inset-0 pointer-events-none rounded-[16777200px]" />
    </div>
  );
}

function Container77() {
  return (
    <div className="h-[20px] relative shrink-0 w-[52px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container78 />
        <Container79 />
        <Container80 />
      </div>
    </div>
  );
}

function Text35() {
  return (
    <div className="h-[15px] relative shrink-0 w-[55.797px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[15px] left-0 text-[#c7b8b2] text-[10px] top-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
          3 attendees
        </p>
      </div>
    </div>
  );
}

function Container76() {
  return (
    <div className="content-stretch flex gap-[6px] h-[20px] items-center relative shrink-0 w-full" data-name="Container">
      <Container77 />
      <Text35 />
    </div>
  );
}

function Container75() {
  return (
    <div className="flex-[174.859_0_0] h-[43.25px] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Paragraph27 />
        <Container76 />
      </div>
    </div>
  );
}

function Text36() {
  return (
    <div className="bg-[#10261c] h-[19px] relative rounded-[16777200px] shrink-0 w-[41.141px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[8px] py-[2px] relative size-full">
        <p className="font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[15px] relative shrink-0 text-[#7ad6a7] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
          Done
        </p>
      </div>
    </div>
  );
}

function Container73() {
  return (
    <div className="bg-[#232323] h-[74px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#4a403c] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="content-stretch flex gap-[12px] items-start p-[13px] relative size-full">
        <Container74 />
        <Container75 />
        <Text36 />
      </div>
    </div>
  );
}

function Paragraph28() {
  return (
    <div className="h-[33px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[16.5px] left-[20px] text-[#ff4615] text-[11px] text-center top-[-0.5px] w-[40px]" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        2:00 PM
      </p>
    </div>
  );
}

function Paragraph29() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[15px] left-[20.02px] text-[#c7b8b2] text-[10px] text-center top-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        1h
      </p>
    </div>
  );
}

function Container82() {
  return (
    <div className="h-[48px] relative shrink-0 w-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph28 />
        <Paragraph29 />
      </div>
    </div>
  );
}

function Paragraph30() {
  return (
    <div className="content-stretch flex h-[19.25px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[19.25px] min-w-px relative text-[#fff2ed] text-[14px]" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Client review
      </p>
    </div>
  );
}

function Text37() {
  return (
    <div className="content-stretch flex h-[16px] items-center justify-center relative shrink-0 w-full" data-name="Text">
      <p className="font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[12px] relative shrink-0 text-[8px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        S
      </p>
    </div>
  );
}

function Container86() {
  return (
    <div className="absolute bg-[#5f514b] left-0 rounded-[16777200px] size-[20px] top-0" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[2px] relative rounded-[inherit] size-full">
        <Text37 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#2c2c2c] border-solid inset-0 pointer-events-none rounded-[16777200px]" />
    </div>
  );
}

function Text38() {
  return (
    <div className="content-stretch flex h-[16px] items-center justify-center relative shrink-0 w-full" data-name="Text">
      <p className="font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[12px] relative shrink-0 text-[8px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        A
      </p>
    </div>
  );
}

function Container87() {
  return (
    <div className="absolute bg-[#5f514b] left-[16px] rounded-[16777200px] size-[20px] top-0" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[2px] relative rounded-[inherit] size-full">
        <Text38 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#2c2c2c] border-solid inset-0 pointer-events-none rounded-[16777200px]" />
    </div>
  );
}

function Text39() {
  return (
    <div className="content-stretch flex h-[16px] items-center justify-center relative shrink-0 w-full" data-name="Text">
      <p className="font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[12px] relative shrink-0 text-[8px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        J
      </p>
    </div>
  );
}

function Container88() {
  return (
    <div className="absolute bg-[#5f514b] left-[32px] rounded-[16777200px] size-[20px] top-0" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[2px] relative rounded-[inherit] size-full">
        <Text39 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#2c2c2c] border-solid inset-0 pointer-events-none rounded-[16777200px]" />
    </div>
  );
}

function Container85() {
  return (
    <div className="h-[20px] relative shrink-0 w-[52px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container86 />
        <Container87 />
        <Container88 />
      </div>
    </div>
  );
}

function Text40() {
  return (
    <div className="h-[15px] relative shrink-0 w-[55.797px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[15px] left-0 text-[#c7b8b2] text-[10px] top-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
          3 attendees
        </p>
      </div>
    </div>
  );
}

function Container84() {
  return (
    <div className="content-stretch flex gap-[6px] h-[20px] items-center relative shrink-0 w-full" data-name="Container">
      <Container85 />
      <Text40 />
    </div>
  );
}

function Container83() {
  return (
    <div className="flex-[160.727_0_0] h-[43.25px] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Paragraph30 />
        <Container84 />
      </div>
    </div>
  );
}

function Text41() {
  return (
    <div className="bg-[#440608] h-[19px] relative rounded-[16777200px] shrink-0 w-[38.609px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[8px] py-[2px] relative size-full">
        <p className="font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[15px] relative shrink-0 text-[#ff9571] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
          Next
        </p>
      </div>
    </div>
  );
}

function Icon35() {
  return (
    <div className="absolute left-[10px] size-[12px] top-[6.25px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M3 1.5L10 6L3 10.5V1.5Z" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Button14() {
  return (
    <div className="bg-[#ff4615] flex-[1_0_0] min-h-px relative rounded-[6px] w-[55.273px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon35 />
        <p className="-translate-x-1/2 absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[16.5px] left-[36.5px] text-[11px] text-center text-white top-[3.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>{` Join`}</p>
      </div>
    </div>
  );
}

function Container89() {
  return (
    <div className="h-[51.5px] relative shrink-0 w-[55.273px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-end relative size-full">
        <Text41 />
        <Button14 />
      </div>
    </div>
  );
}

function Container81() {
  return (
    <div className="bg-[#440608] h-[77.5px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#ff4615] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="content-stretch flex gap-[12px] items-start p-[13px] relative size-full">
        <Container82 />
        <Container83 />
        <Container89 />
      </div>
    </div>
  );
}

function Paragraph31() {
  return (
    <div className="h-[33px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[16.5px] left-[20px] text-[#fff2ed] text-[11px] text-center top-[-0.5px] w-[40px]" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        4:30 PM
      </p>
    </div>
  );
}

function Paragraph32() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[15px] left-[20.02px] text-[#c7b8b2] text-[10px] text-center top-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        1h
      </p>
    </div>
  );
}

function Container91() {
  return (
    <div className="h-[48px] relative shrink-0 w-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph31 />
        <Paragraph32 />
      </div>
    </div>
  );
}

function Paragraph33() {
  return (
    <div className="content-stretch flex h-[19.25px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[19.25px] min-w-px relative text-[#fff2ed] text-[14px]" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Team retrospective
      </p>
    </div>
  );
}

function Text42() {
  return (
    <div className="content-stretch flex h-[16px] items-center justify-center relative shrink-0 w-full" data-name="Text">
      <p className="font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[12px] relative shrink-0 text-[8px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        S
      </p>
    </div>
  );
}

function Container95() {
  return (
    <div className="absolute bg-[#5f514b] left-0 rounded-[16777200px] size-[20px] top-0" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[2px] relative rounded-[inherit] size-full">
        <Text42 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#2c2c2c] border-solid inset-0 pointer-events-none rounded-[16777200px]" />
    </div>
  );
}

function Text43() {
  return (
    <div className="content-stretch flex h-[16px] items-center justify-center relative shrink-0 w-full" data-name="Text">
      <p className="font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[12px] relative shrink-0 text-[8px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        M
      </p>
    </div>
  );
}

function Container96() {
  return (
    <div className="absolute bg-[#5f514b] left-[16px] rounded-[16777200px] size-[20px] top-0" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[2px] relative rounded-[inherit] size-full">
        <Text43 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#2c2c2c] border-solid inset-0 pointer-events-none rounded-[16777200px]" />
    </div>
  );
}

function Text44() {
  return (
    <div className="content-stretch flex h-[16px] items-center justify-center relative shrink-0 w-full" data-name="Text">
      <p className="font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[12px] relative shrink-0 text-[8px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        E
      </p>
    </div>
  );
}

function Container97() {
  return (
    <div className="absolute bg-[#5f514b] left-[32px] rounded-[16777200px] size-[20px] top-0" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[2px] relative rounded-[inherit] size-full">
        <Text44 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#2c2c2c] border-solid inset-0 pointer-events-none rounded-[16777200px]" />
    </div>
  );
}

function Text45() {
  return (
    <div className="h-[12px] relative shrink-0 w-[9.609px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[12px] left-0 text-[#c7b8b2] text-[8px] top-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
          +1
        </p>
      </div>
    </div>
  );
}

function Container98() {
  return (
    <div className="absolute bg-[#262322] content-stretch flex items-center justify-center left-[48px] px-[5.195px] py-[2px] rounded-[16777200px] size-[20px] top-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[#2c2c2c] border-solid inset-0 pointer-events-none rounded-[16777200px]" />
      <Text45 />
    </div>
  );
}

function Container94() {
  return (
    <div className="h-[20px] relative shrink-0 w-[68px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container95 />
        <Container96 />
        <Container97 />
        <Container98 />
      </div>
    </div>
  );
}

function Text46() {
  return (
    <div className="h-[15px] relative shrink-0 w-[55.797px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[15px] left-0 text-[#c7b8b2] text-[10px] top-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
          4 attendees
        </p>
      </div>
    </div>
  );
}

function Container93() {
  return (
    <div className="content-stretch flex gap-[6px] h-[20px] items-center relative shrink-0 w-full" data-name="Container">
      <Container94 />
      <Text46 />
    </div>
  );
}

function Container92() {
  return (
    <div className="flex-[152.063_0_0] h-[43.25px] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Paragraph33 />
        <Container93 />
      </div>
    </div>
  );
}

function Text47() {
  return (
    <div className="bg-[#101d36] h-[19px] relative rounded-[16777200px] shrink-0 w-[63.938px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[8px] py-[2px] relative size-full">
        <p className="font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[15px] relative shrink-0 text-[#a9cbff] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
          Upcoming
        </p>
      </div>
    </div>
  );
}

function Icon36() {
  return (
    <div className="absolute left-[11px] size-[12px] top-[7.25px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_491_1207)" id="Icon">
          <path d={svgPaths.pecd8080} id="Vector" stroke="var(--stroke-0, #C7B8B2)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10 1.5V3.5" id="Vector_2" stroke="var(--stroke-0, #C7B8B2)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M11 2.5H9" id="Vector_3" stroke="var(--stroke-0, #C7B8B2)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 8.5V9.5" id="Vector_4" stroke="var(--stroke-0, #C7B8B2)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2.5 9H1.5" id="Vector_5" stroke="var(--stroke-0, #C7B8B2)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_491_1207">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button15() {
  return (
    <div className="flex-[1_0_0] min-h-px relative rounded-[6px] w-[61.797px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#4a403c] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon36 />
        <p className="-translate-x-1/2 absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[16.5px] left-[39.5px] text-[#c7b8b2] text-[11px] text-center top-[4.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>{` Prep`}</p>
      </div>
    </div>
  );
}

function Container99() {
  return (
    <div className="h-[53.5px] relative shrink-0 w-[63.938px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-end relative size-full">
        <Text47 />
        <Button15 />
      </div>
    </div>
  );
}

function Container90() {
  return (
    <div className="bg-[#232323] h-[79.5px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#4a403c] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="content-stretch flex gap-[12px] items-start p-[13px] relative size-full">
        <Container91 />
        <Container92 />
        <Container99 />
      </div>
    </div>
  );
}

function Container72() {
  return (
    <div className="flex-[340_0_0] min-h-px relative w-[338px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[12px] items-start pt-[16px] px-[16px] relative size-full">
        <Container73 />
        <Container81 />
        <Container90 />
      </div>
    </div>
  );
}

function Container70() {
  return (
    <div className="absolute bg-[#2c2c2c] h-[392px] left-[609px] rounded-[14px] top-0 w-[340px]" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <Container71 />
        <Container72 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#4a403c] border-solid inset-0 pointer-events-none rounded-[14px]" />
    </div>
  );
}

function Container46() {
  return (
    <div className="h-[392px] relative shrink-0 w-full" data-name="Container">
      <Container47 />
      <Container70 />
    </div>
  );
}

function Icon37() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p1bb15080} id="Vector" stroke="var(--stroke-0, #A9CBFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text48() {
  return (
    <div className="flex-[329.773_0_0] h-[21px] min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[21px] left-0 text-[#fff2ed] text-[14px] top-0 whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>{`Mentions & Chats`}</p>
      </div>
    </div>
  );
}

function Icon38() {
  return (
    <div className="absolute left-[58.73px] size-[12px] top-[2.25px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M2.5 6H9.5" id="Vector" stroke="var(--stroke-0, #C7B8B2)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 2.5L9.5 6L6 9.5" id="Vector_2" stroke="var(--stroke-0, #C7B8B2)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Link13() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[70.727px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[16.5px] left-0 text-[#c7b8b2] text-[11px] top-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>{`Open Chat `}</p>
        <Icon38 />
      </div>
    </div>
  );
}

function Container102() {
  return (
    <div className="h-[50px] relative shrink-0 w-[464.5px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.06)] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center pb-[13px] pt-[16px] px-[16px] relative size-full">
        <Icon37 />
        <Text48 />
        <Link13 />
      </div>
    </div>
  );
}

function Container105() {
  return (
    <div className="bg-[#f59e0b] relative rounded-[16777200px] shrink-0 size-[34px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Nunito_Sans:SemiBold',sans-serif] font-semibold leading-[17.85px] relative shrink-0 text-[11.9px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
          SJ
        </p>
      </div>
    </div>
  );
}

function Text49() {
  return (
    <div className="h-[18px] relative shrink-0 w-[78.344px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[18px] left-0 text-[#fff2ed] text-[12px] top-0 whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
          Sarah Johnson
        </p>
      </div>
    </div>
  );
}

function Icon39() {
  return (
    <div className="absolute left-0 size-[12px] top-[2.25px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M2 4.5H10" id="Vector" stroke="var(--stroke-0, #C7B8B2)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 7.5H10" id="Vector_2" stroke="var(--stroke-0, #C7B8B2)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 1.5L4 10.5" id="Vector_3" stroke="var(--stroke-0, #C7B8B2)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 1.5L7 10.5" id="Vector_4" stroke="var(--stroke-0, #C7B8B2)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text50() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[49.664px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon39 />
        <p className="absolute font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[16.5px] left-[16px] text-[#c7b8b2] text-[11px] top-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
          design
        </p>
      </div>
    </div>
  );
}

function Container107() {
  return (
    <div className="content-stretch flex gap-[6px] h-[18px] items-center relative shrink-0 w-full" data-name="Container">
      <Text49 />
      <Text50 />
    </div>
  );
}

function Paragraph34() {
  return (
    <div className="content-stretch flex h-[16.5px] items-start overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[16.5px] relative shrink-0 text-[#c7b8b2] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        @John can you review the new header design? I added some notes.
      </p>
    </div>
  );
}

function Paragraph35() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[15px] left-0 text-[#c7b8b2] text-[10px] top-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        12 min ago
      </p>
    </div>
  );
}

function Container106() {
  return (
    <div className="flex-[360.5_0_0] h-[53.5px] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative size-full">
        <Container107 />
        <Paragraph34 />
        <Paragraph35 />
      </div>
    </div>
  );
}

function Container109() {
  return <div className="bg-[#ff4615] relative rounded-[16777200px] shrink-0 size-[8px]" data-name="Container" />;
}

function Icon40() {
  return (
    <div className="h-[14px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.8333 12.8333">
            <path d={svgPaths.p13f5b400} id="Vector" stroke="var(--stroke-0, #C7B8B2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[41.67%_37.5%]" data-name="Vector">
        <div className="absolute inset-[-25%_-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.66667 3.5">
            <path d={svgPaths.p21bae700} id="Vector" stroke="var(--stroke-0, #C7B8B2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button16() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon40 />
      </div>
    </div>
  );
}

function Container108() {
  return (
    <div className="h-[53.5px] relative shrink-0 w-[14px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-end relative size-full">
        <Container109 />
        <Button16 />
      </div>
    </div>
  );
}

function Container104() {
  return (
    <div className="bg-[rgba(68,6,8,0.3)] h-[78.5px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.06)] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex gap-[12px] items-start pb-[13px] pt-[12px] px-[16px] relative size-full">
        <Container105 />
        <Container106 />
        <Container108 />
      </div>
    </div>
  );
}

function Container111() {
  return (
    <div className="bg-[#3b82f6] relative rounded-[16777200px] shrink-0 size-[34px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Nunito_Sans:SemiBold',sans-serif] font-semibold leading-[17.85px] relative shrink-0 text-[11.9px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
          MC
        </p>
      </div>
    </div>
  );
}

function Text51() {
  return (
    <div className="h-[18px] relative shrink-0 w-[56.859px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[18px] left-0 text-[#fff2ed] text-[12px] top-0 whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
          Mike Chen
        </p>
      </div>
    </div>
  );
}

function Icon41() {
  return (
    <div className="absolute left-0 size-[12px] top-[2.25px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p3e661000} id="Vector" stroke="var(--stroke-0, #C7B8B2)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text52() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[33.828px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon41 />
        <p className="absolute font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[16.5px] left-[16px] text-[#c7b8b2] text-[11px] top-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
          DM
        </p>
      </div>
    </div>
  );
}

function Container113() {
  return (
    <div className="content-stretch flex gap-[6px] h-[18px] items-center relative shrink-0 w-full" data-name="Container">
      <Text51 />
      <Text52 />
    </div>
  );
}

function Paragraph36() {
  return (
    <div className="content-stretch flex h-[16.5px] items-start overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[16.5px] relative shrink-0 text-[#c7b8b2] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Hey, just pushed the changes to the staging branch. Looks good!
      </p>
    </div>
  );
}

function Paragraph37() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[15px] left-0 text-[#c7b8b2] text-[10px] top-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        1h ago
      </p>
    </div>
  );
}

function Container112() {
  return (
    <div className="flex-[360.5_0_0] h-[53.5px] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative size-full">
        <Container113 />
        <Paragraph36 />
        <Paragraph37 />
      </div>
    </div>
  );
}

function Container115() {
  return <div className="bg-[#ff4615] relative rounded-[16777200px] shrink-0 size-[8px]" data-name="Container" />;
}

function Icon42() {
  return (
    <div className="h-[14px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.8333 12.8333">
            <path d={svgPaths.p13f5b400} id="Vector" stroke="var(--stroke-0, #C7B8B2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[41.67%_37.5%]" data-name="Vector">
        <div className="absolute inset-[-25%_-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.66667 3.5">
            <path d={svgPaths.p21bae700} id="Vector" stroke="var(--stroke-0, #C7B8B2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button17() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon42 />
      </div>
    </div>
  );
}

function Container114() {
  return (
    <div className="h-[53.5px] relative shrink-0 w-[14px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-end relative size-full">
        <Container115 />
        <Button17 />
      </div>
    </div>
  );
}

function Container110() {
  return (
    <div className="bg-[rgba(68,6,8,0.3)] h-[78.5px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.06)] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex gap-[12px] items-start pb-[13px] pt-[12px] px-[16px] relative size-full">
        <Container111 />
        <Container112 />
        <Container114 />
      </div>
    </div>
  );
}

function Container117() {
  return (
    <div className="bg-[#0f5fd7] relative rounded-[16777200px] shrink-0 size-[34px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Nunito_Sans:SemiBold',sans-serif] font-semibold leading-[17.85px] relative shrink-0 text-[11.9px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
          ED
        </p>
      </div>
    </div>
  );
}

function Text53() {
  return (
    <div className="h-[18px] relative shrink-0 w-[63.164px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[18px] left-0 text-[#fff2ed] text-[12px] top-0 whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
          Emily Davis
        </p>
      </div>
    </div>
  );
}

function Icon43() {
  return (
    <div className="absolute left-0 size-[12px] top-[2.25px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M2 4.5H10" id="Vector" stroke="var(--stroke-0, #C7B8B2)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 7.5H10" id="Vector_2" stroke="var(--stroke-0, #C7B8B2)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 1.5L4 10.5" id="Vector_3" stroke="var(--stroke-0, #C7B8B2)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 1.5L7 10.5" id="Vector_4" stroke="var(--stroke-0, #C7B8B2)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text54() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[54.398px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon43 />
        <p className="absolute font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[16.5px] left-[16px] text-[#c7b8b2] text-[11px] top-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
          general
        </p>
      </div>
    </div>
  );
}

function Container119() {
  return (
    <div className="content-stretch flex gap-[6px] h-[18px] items-center relative shrink-0 w-full" data-name="Container">
      <Text53 />
      <Text54 />
    </div>
  );
}

function Paragraph38() {
  return (
    <div className="content-stretch flex h-[16.5px] items-start overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[16.5px] min-w-px relative text-[#c7b8b2] text-[12px]" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        @John the API documentation is ready for your review.
      </p>
    </div>
  );
}

function Paragraph39() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[15px] left-0 text-[#c7b8b2] text-[10px] top-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        2h ago
      </p>
    </div>
  );
}

function Container118() {
  return (
    <div className="flex-[360.5_0_0] h-[53.5px] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative size-full">
        <Container119 />
        <Paragraph38 />
        <Paragraph39 />
      </div>
    </div>
  );
}

function Icon44() {
  return (
    <div className="h-[14px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.8333 12.8333">
            <path d={svgPaths.p13f5b400} id="Vector" stroke="var(--stroke-0, #C7B8B2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[41.67%_37.5%]" data-name="Vector">
        <div className="absolute inset-[-25%_-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.66667 3.5">
            <path d={svgPaths.p21bae700} id="Vector" stroke="var(--stroke-0, #C7B8B2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button18() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon44 />
      </div>
    </div>
  );
}

function Container120() {
  return (
    <div className="h-[53.5px] relative shrink-0 w-[14px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-end relative size-full">
        <Button18 />
      </div>
    </div>
  );
}

function Container116() {
  return (
    <div className="h-[78.5px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.06)] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex gap-[12px] items-start pb-[13px] pt-[12px] px-[16px] relative size-full">
        <Container117 />
        <Container118 />
        <Container120 />
      </div>
    </div>
  );
}

function Icon45() {
  return (
    <div className="absolute left-0 size-[14px] top-[2px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p26576520} id="Vector" stroke="var(--stroke-0, #C7B8B2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p10d5d600} id="Vector_2" stroke="var(--stroke-0, #C7B8B2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Link14() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Link">
      <Icon45 />
      <p className="absolute font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[18px] left-[20px] text-[#c7b8b2] text-[12px] top-0 whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>{` Reply in chat`}</p>
    </div>
  );
}

function Container121() {
  return (
    <div className="h-[42px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pt-[12px] px-[16px] relative size-full">
        <Link14 />
      </div>
    </div>
  );
}

function Container103() {
  return (
    <div className="flex-[398_0_0] min-h-px relative w-[464.5px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container104 />
        <Container110 />
        <Container116 />
        <Container121 />
      </div>
    </div>
  );
}

function Container101() {
  return (
    <div className="absolute bg-[#2c2c2c] h-[450px] left-0 rounded-[14px] top-0 w-[466.5px]" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <Container102 />
        <Container103 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#4a403c] border-solid inset-0 pointer-events-none rounded-[14px]" />
    </div>
  );
}

function Icon46() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p19987d80} id="Vector" stroke="var(--stroke-0, #7AD6A7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M14 2V5.33333H10.6667" id="Vector_2" stroke="var(--stroke-0, #7AD6A7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2a3e9c80} id="Vector_3" stroke="var(--stroke-0, #7AD6A7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M5.33333 10.6667H2V14" id="Vector_4" stroke="var(--stroke-0, #7AD6A7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text55() {
  return (
    <div className="flex-[345.773_0_0] h-[21px] min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[21px] left-0 text-[#fff2ed] text-[14px] top-0 whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
          Continue Working
        </p>
      </div>
    </div>
  );
}

function Icon47() {
  return (
    <div className="absolute left-[42.73px] size-[12px] top-[2.25px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M2.5 6H9.5" id="Vector" stroke="var(--stroke-0, #C7B8B2)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 2.5L9.5 6L6 9.5" id="Vector_2" stroke="var(--stroke-0, #C7B8B2)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Link15() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[54.727px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[16.5px] left-0 text-[#c7b8b2] text-[11px] top-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>{`All files `}</p>
        <Icon47 />
      </div>
    </div>
  );
}

function Container123() {
  return (
    <div className="h-[50px] relative shrink-0 w-[464.5px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.06)] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center pb-[13px] pt-[16px] px-[16px] relative size-full">
        <Icon46 />
        <Text55 />
        <Link15 />
      </div>
    </div>
  );
}

function Paragraph40() {
  return (
    <div className="absolute h-[15px] left-[16px] top-[16px] w-[432.5px]" data-name="Paragraph">
      <p className="absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[15px] left-0 text-[#c7b8b2] text-[10px] top-[-0.5px] tracking-[1px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Recent files
      </p>
    </div>
  );
}

function Icon48() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p19416e00} id="Vector" stroke="var(--stroke-0, #C7B8B2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3e059a80} id="Vector_2" stroke="var(--stroke-0, #C7B8B2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6.66667 6H5.33333" id="Vector_3" stroke="var(--stroke-0, #C7B8B2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10.6667 8.66667H5.33333" id="Vector_4" stroke="var(--stroke-0, #C7B8B2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10.6667 11.3333H5.33333" id="Vector_5" stroke="var(--stroke-0, #C7B8B2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container126() {
  return (
    <div className="bg-[#2c2c2c] relative rounded-[8px] shrink-0 size-[32px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#4a403c] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[8px] py-px relative size-full">
        <Icon48 />
      </div>
    </div>
  );
}

function Paragraph41() {
  return (
    <div className="h-[18px] overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[18px] left-0 text-[#fff2ed] text-[12px] top-0 whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Website Redesign Deck.fig
      </p>
    </div>
  );
}

function Paragraph42() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[15px] left-0 text-[#c7b8b2] text-[10px] top-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Sarah Johnson · 2h ago
      </p>
    </div>
  );
}

function Container127() {
  return (
    <div className="flex-[295.563_0_0] h-[33px] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph41 />
        <Paragraph42 />
      </div>
    </div>
  );
}

function Container125() {
  return (
    <div className="absolute bg-[#232323] content-stretch flex gap-[12px] h-[55px] items-center left-[16px] pl-[13px] pr-[79.938px] py-[11px] rounded-[10px] top-[43px] w-[432.5px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#4a403c] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container126 />
      <Container127 />
    </div>
  );
}

function Icon49() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p19416e00} id="Vector" stroke="var(--stroke-0, #D90000)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3e059a80} id="Vector_2" stroke="var(--stroke-0, #D90000)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6.66667 6H5.33333" id="Vector_3" stroke="var(--stroke-0, #D90000)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10.6667 8.66667H5.33333" id="Vector_4" stroke="var(--stroke-0, #D90000)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10.6667 11.3333H5.33333" id="Vector_5" stroke="var(--stroke-0, #D90000)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container129() {
  return (
    <div className="bg-[#2c2c2c] relative rounded-[8px] shrink-0 size-[32px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#4a403c] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[8px] py-px relative size-full">
        <Icon49 />
      </div>
    </div>
  );
}

function Paragraph43() {
  return (
    <div className="h-[18px] overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[18px] left-0 text-[#fff2ed] text-[12px] top-0 whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Q2 Launch Brief.pdf
      </p>
    </div>
  );
}

function Paragraph44() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[15px] left-0 text-[#c7b8b2] text-[10px] top-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Mike Chen · Yesterday
      </p>
    </div>
  );
}

function Container130() {
  return (
    <div className="flex-[295.563_0_0] h-[33px] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph43 />
        <Paragraph44 />
      </div>
    </div>
  );
}

function Container128() {
  return (
    <div className="absolute bg-[#232323] content-stretch flex gap-[12px] h-[55px] items-center left-[16px] pl-[13px] pr-[79.938px] py-[11px] rounded-[10px] top-[106px] w-[432.5px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#4a403c] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container129 />
      <Container130 />
    </div>
  );
}

function Icon50() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p19416e00} id="Vector" stroke="var(--stroke-0, #D90000)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3e059a80} id="Vector_2" stroke="var(--stroke-0, #D90000)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6.66667 6H5.33333" id="Vector_3" stroke="var(--stroke-0, #D90000)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10.6667 8.66667H5.33333" id="Vector_4" stroke="var(--stroke-0, #D90000)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10.6667 11.3333H5.33333" id="Vector_5" stroke="var(--stroke-0, #D90000)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container132() {
  return (
    <div className="bg-[#2c2c2c] relative rounded-[8px] shrink-0 size-[32px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#4a403c] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[8px] py-px relative size-full">
        <Icon50 />
      </div>
    </div>
  );
}

function Paragraph45() {
  return (
    <div className="h-[18px] overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[18px] left-0 text-[#fff2ed] text-[12px] top-0 whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Brand Guidelines.pdf
      </p>
    </div>
  );
}

function Paragraph46() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[15px] left-0 text-[#c7b8b2] text-[10px] top-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        You · 3h ago
      </p>
    </div>
  );
}

function Container133() {
  return (
    <div className="flex-[295.563_0_0] h-[33px] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph45 />
        <Paragraph46 />
      </div>
    </div>
  );
}

function Container131() {
  return (
    <div className="absolute bg-[#232323] content-stretch flex gap-[12px] h-[55px] items-center left-[16px] pl-[13px] pr-[79.938px] py-[11px] rounded-[10px] top-[169px] w-[432.5px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#4a403c] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container132 />
      <Container133 />
    </div>
  );
}

function Icon51() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p19416e00} id="Vector" stroke="var(--stroke-0, #7AD6A7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3e059a80} id="Vector_2" stroke="var(--stroke-0, #7AD6A7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6.66667 6H5.33333" id="Vector_3" stroke="var(--stroke-0, #7AD6A7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10.6667 8.66667H5.33333" id="Vector_4" stroke="var(--stroke-0, #7AD6A7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10.6667 11.3333H5.33333" id="Vector_5" stroke="var(--stroke-0, #7AD6A7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container135() {
  return (
    <div className="bg-[#2c2c2c] relative rounded-[8px] shrink-0 size-[32px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#4a403c] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[8px] py-px relative size-full">
        <Icon51 />
      </div>
    </div>
  );
}

function Paragraph47() {
  return (
    <div className="h-[18px] overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[18px] left-0 text-[#fff2ed] text-[12px] top-0 whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Design Tokens.json
      </p>
    </div>
  );
}

function Paragraph48() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[15px] left-0 text-[#c7b8b2] text-[10px] top-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Emily Davis · 4h ago
      </p>
    </div>
  );
}

function Container136() {
  return (
    <div className="flex-[300.352_0_0] h-[33px] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph47 />
        <Paragraph48 />
      </div>
    </div>
  );
}

function Container134() {
  return (
    <div className="absolute bg-[#232323] content-stretch flex gap-[12px] h-[55px] items-center left-[16px] pl-[13px] pr-[75.148px] py-[11px] rounded-[10px] top-[232px] w-[432.5px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#4a403c] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container135 />
      <Container136 />
    </div>
  );
}

function Paragraph49() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[15px] left-0 text-[#c7b8b2] text-[10px] top-[-0.5px] tracking-[1px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Last active
      </p>
    </div>
  );
}

function Icon52() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M2.66667 6H13.3333" id="Vector" stroke="var(--stroke-0, #0F5FD7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M2.66667 10H13.3333" id="Vector_2" stroke="var(--stroke-0, #0F5FD7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6.66667 2L5.33333 14" id="Vector_3" stroke="var(--stroke-0, #0F5FD7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10.6667 2L9.33333 14" id="Vector_4" stroke="var(--stroke-0, #0F5FD7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container138() {
  return (
    <div className="bg-[#101d36] relative rounded-[8px] shrink-0 size-[32px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#4a403c] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[8px] py-px relative size-full">
        <Icon52 />
      </div>
    </div>
  );
}

function Paragraph50() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[18px] left-0 text-[#fff2ed] text-[12px] top-0 whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        #design
      </p>
    </div>
  );
}

function Paragraph51() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[15px] left-0 text-[#c7b8b2] text-[10px] top-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Design Team · 3 unread
      </p>
    </div>
  );
}

function Container139() {
  return (
    <div className="flex-[327.898_0_0] h-[33px] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph50 />
        <Paragraph51 />
      </div>
    </div>
  );
}

function Text56() {
  return (
    <div className="bg-[#440608] h-[20.5px] relative rounded-[16777200px] shrink-0 w-[22.602px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[8px] py-[2px] relative size-full">
        <p className="font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[16.5px] relative shrink-0 text-[#ff9571] text-[11px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
          3
        </p>
      </div>
    </div>
  );
}

function Link16() {
  return (
    <div className="bg-[#232323] h-[55px] relative rounded-[10px] shrink-0 w-full" data-name="Link">
      <div aria-hidden="true" className="absolute border border-[#4a403c] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[13px] py-[11px] relative size-full">
          <Container138 />
          <Container139 />
          <Text56 />
        </div>
      </div>
    </div>
  );
}

function Container137() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[87px] items-start left-[16px] pt-[9px] top-[295px] w-[432.5px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.06)] border-solid border-t inset-0 pointer-events-none" />
      <Paragraph49 />
      <Link16 />
    </div>
  );
}

function Container124() {
  return (
    <div className="flex-[398_0_0] min-h-px relative w-[464.5px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Paragraph40 />
        <Container125 />
        <Container128 />
        <Container131 />
        <Container134 />
        <Container137 />
      </div>
    </div>
  );
}

function Container122() {
  return (
    <div className="absolute bg-[#2c2c2c] h-[450px] left-[482.5px] rounded-[14px] top-0 w-[466.5px]" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <Container123 />
        <Container124 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#4a403c] border-solid inset-0 pointer-events-none rounded-[14px]" />
    </div>
  );
}

function Container100() {
  return (
    <div className="h-[450px] relative shrink-0 w-full" data-name="Container">
      <Container101 />
      <Container122 />
    </div>
  );
}

function Icon53() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_491_1010)" id="Icon">
          <path d={svgPaths.p3227a460} id="Vector" stroke="var(--stroke-0, #A9CBFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_491_1010">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text57() {
  return (
    <div className="flex-[347.961_0_0] h-[21px] min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[21px] left-0 text-[#fff2ed] text-[14px] top-0 whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
          Team Pulse
        </p>
      </div>
    </div>
  );
}

function Text59() {
  return <div className="absolute bg-[#7ad6a7] left-0 rounded-[16777200px] size-[8px] top-[4.25px]" data-name="Text" />;
}

function Text58() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[52.539px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text59 />
        <p className="absolute font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[16.5px] left-[12px] text-[#c7b8b2] text-[11px] top-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>{` 3 online`}</p>
      </div>
    </div>
  );
}

function Container142() {
  return (
    <div className="h-[50px] relative shrink-0 w-[464.5px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.06)] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center pb-[13px] pt-[16px] px-[16px] relative size-full">
        <Icon53 />
        <Text57 />
        <Text58 />
      </div>
    </div>
  );
}

function Paragraph52() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[15px] left-0 text-[#c7b8b2] text-[10px] top-[-0.5px] tracking-[1px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Voice rooms
      </p>
    </div>
  );
}

function Icon54() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p1ac4a580} id="Vector" stroke="var(--stroke-0, #A9CBFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.pcf96680} id="Vector_2" stroke="var(--stroke-0, #A9CBFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p1fb6d700} id="Vector_3" stroke="var(--stroke-0, #A9CBFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Container147() {
  return (
    <div className="absolute bg-[#101d36] content-stretch flex items-center justify-center left-[13px] px-[7px] rounded-[7px] size-[28px] top-[13.5px]" data-name="Container">
      <Icon54 />
    </div>
  );
}

function Paragraph53() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[18px] left-0 text-[#fff2ed] text-[12px] top-0 whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Design Voice
      </p>
    </div>
  );
}

function Paragraph54() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[15px] left-0 text-[#c7b8b2] text-[10px] top-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        3 in room
      </p>
    </div>
  );
}

function Container148() {
  return (
    <div className="absolute content-stretch flex flex-col h-[33px] items-start left-[53px] top-[11px] w-[225.227px]" data-name="Container">
      <Paragraph53 />
      <Paragraph54 />
    </div>
  );
}

function Text60() {
  return (
    <div className="h-[12px] relative shrink-0 w-[5.25px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[12px] left-0 text-[8px] text-white top-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
          S
        </p>
      </div>
    </div>
  );
}

function Container149() {
  return (
    <div className="absolute bg-[#5f514b] left-[290.23px] rounded-[16777200px] size-[20px] top-[17.5px]" data-name="Container">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[7.375px] py-[2px] relative rounded-[inherit] size-full">
        <Text60 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#2c2c2c] border-solid inset-0 pointer-events-none rounded-[16777200px]" />
    </div>
  );
}

function Text61() {
  return (
    <div className="h-[12px] relative shrink-0 w-[7.281px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[12px] left-0 text-[8px] text-white top-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
          M
        </p>
      </div>
    </div>
  );
}

function Container150() {
  return (
    <div className="absolute bg-[#5f514b] left-[306.23px] rounded-[16777200px] size-[20px] top-[17.5px]" data-name="Container">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[6.359px] py-[2px] relative rounded-[inherit] size-full">
        <Text61 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#2c2c2c] border-solid inset-0 pointer-events-none rounded-[16777200px]" />
    </div>
  );
}

function Text62() {
  return (
    <div className="h-[12px] relative shrink-0 w-[5.102px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[12px] left-0 text-[8px] text-white top-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
          E
        </p>
      </div>
    </div>
  );
}

function Container151() {
  return (
    <div className="absolute bg-[#5f514b] left-[322.23px] rounded-[16777200px] size-[20px] top-[17.5px]" data-name="Container">
      <div className="content-stretch flex items-center justify-center overflow-clip pl-[7.445px] pr-[7.453px] py-[2px] relative rounded-[inherit] size-full">
        <Text62 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#2c2c2c] border-solid inset-0 pointer-events-none rounded-[16777200px]" />
    </div>
  );
}

function Icon55() {
  return (
    <div className="absolute left-[10px] size-[12px] top-[6.25px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p2ad00f00} id="Vector" stroke="var(--stroke-0, #C7B8B2)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Button19() {
  return (
    <div className="absolute border border-[#4a403c] border-solid h-[26.5px] left-[362.23px] rounded-[6px] top-[14.25px] w-[57.273px]" data-name="Button">
      <Icon55 />
      <p className="-translate-x-1/2 absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[16.5px] left-[36.5px] text-[#c7b8b2] text-[11px] text-center top-[3.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>{` Join`}</p>
    </div>
  );
}

function Container146() {
  return (
    <div className="bg-[#232323] h-[55px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#4a403c] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container147 />
      <Container148 />
      <Container149 />
      <Container150 />
      <Container151 />
      <Button19 />
    </div>
  );
}

function Icon56() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p1ac4a580} id="Vector" stroke="var(--stroke-0, #A9CBFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.pcf96680} id="Vector_2" stroke="var(--stroke-0, #A9CBFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p1fb6d700} id="Vector_3" stroke="var(--stroke-0, #A9CBFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Container153() {
  return (
    <div className="absolute bg-[#101d36] content-stretch flex items-center justify-center left-[13px] px-[7px] rounded-[7px] size-[28px] top-[13.5px]" data-name="Container">
      <Icon56 />
    </div>
  );
}

function Paragraph55() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[18px] left-0 text-[#fff2ed] text-[12px] top-0 whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Lounge
      </p>
    </div>
  );
}

function Paragraph56() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[15px] left-0 text-[#c7b8b2] text-[10px] top-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        1 in room
      </p>
    </div>
  );
}

function Container154() {
  return (
    <div className="absolute content-stretch flex flex-col h-[33px] items-start left-[53px] top-[11px] w-[257.227px]" data-name="Container">
      <Paragraph55 />
      <Paragraph56 />
    </div>
  );
}

function Text63() {
  return (
    <div className="h-[12px] relative shrink-0 w-[6.117px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[12px] left-0 text-[8px] text-white top-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
          A
        </p>
      </div>
    </div>
  );
}

function Container155() {
  return (
    <div className="absolute bg-[#5f514b] left-[322.23px] rounded-[16777200px] size-[20px] top-[17.5px]" data-name="Container">
      <div className="content-stretch flex items-center justify-center overflow-clip pl-[6.938px] pr-[6.945px] py-[2px] relative rounded-[inherit] size-full">
        <Text63 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#2c2c2c] border-solid inset-0 pointer-events-none rounded-[16777200px]" />
    </div>
  );
}

function Icon57() {
  return (
    <div className="absolute left-[10px] size-[12px] top-[6.25px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p2ad00f00} id="Vector" stroke="var(--stroke-0, #C7B8B2)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Button20() {
  return (
    <div className="absolute border border-[#4a403c] border-solid h-[26.5px] left-[362.23px] rounded-[6px] top-[14.25px] w-[57.273px]" data-name="Button">
      <Icon57 />
      <p className="-translate-x-1/2 absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[16.5px] left-[36.5px] text-[#c7b8b2] text-[11px] text-center top-[3.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>{` Join`}</p>
    </div>
  );
}

function Container152() {
  return (
    <div className="bg-[#232323] h-[55px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#4a403c] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container153 />
      <Container154 />
      <Container155 />
      <Button20 />
    </div>
  );
}

function Container145() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[118px] items-start relative shrink-0 w-full" data-name="Container">
      <Container146 />
      <Container152 />
    </div>
  );
}

function Container144() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[141px] items-start relative shrink-0 w-full" data-name="Container">
      <Paragraph52 />
      <Container145 />
    </div>
  );
}

function Paragraph57() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[15px] left-0 text-[#c7b8b2] text-[10px] top-[-0.5px] tracking-[1px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Members
      </p>
    </div>
  );
}

function Container159() {
  return (
    <div className="absolute bg-[#f59e0b] content-stretch flex items-center justify-center left-0 rounded-[16777200px] size-[28px] top-[8.5px]" data-name="Container">
      <p className="font-['Nunito_Sans:SemiBold',sans-serif] font-semibold leading-[14.7px] relative shrink-0 text-[9.8px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        SJ
      </p>
    </div>
  );
}

function Text64() {
  return <div className="absolute bg-[#7ad6a7] border-2 border-[#2c2c2c] border-solid left-[20px] rounded-[16777200px] size-[10px] top-[28.5px]" data-name="Text" />;
}

function Paragraph58() {
  return (
    <div className="h-[18px] overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[18px] left-0 text-[#fff2ed] text-[12px] top-0 whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Sarah Johnson
      </p>
    </div>
  );
}

function Paragraph59() {
  return (
    <div className="h-[15px] overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[15px] left-0 text-[#c7b8b2] text-[10px] top-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        In Design Voice
      </p>
    </div>
  );
}

function Container160() {
  return (
    <div className="absolute content-stretch flex flex-col h-[33px] items-start left-[38px] top-[6px] w-[394.5px]" data-name="Container">
      <Paragraph58 />
      <Paragraph59 />
    </div>
  );
}

function Container158() {
  return (
    <div className="h-[45px] relative shrink-0 w-full" data-name="Container">
      <Container159 />
      <Text64 />
      <Container160 />
    </div>
  );
}

function Container162() {
  return (
    <div className="absolute bg-[#3b82f6] content-stretch flex items-center justify-center left-0 rounded-[16777200px] size-[28px] top-[8.5px]" data-name="Container">
      <p className="font-['Nunito_Sans:SemiBold',sans-serif] font-semibold leading-[14.7px] relative shrink-0 text-[9.8px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        MC
      </p>
    </div>
  );
}

function Text65() {
  return <div className="absolute bg-[#7ad6a7] border-2 border-[#2c2c2c] border-solid left-[20px] rounded-[16777200px] size-[10px] top-[28.5px]" data-name="Text" />;
}

function Paragraph60() {
  return (
    <div className="h-[18px] overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[18px] left-0 text-[#fff2ed] text-[12px] top-0 whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Mike Chen
      </p>
    </div>
  );
}

function Paragraph61() {
  return (
    <div className="h-[15px] overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[15px] left-0 text-[#c7b8b2] text-[10px] top-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Browsing files
      </p>
    </div>
  );
}

function Container163() {
  return (
    <div className="absolute content-stretch flex flex-col h-[33px] items-start left-[38px] top-[6px] w-[394.5px]" data-name="Container">
      <Paragraph60 />
      <Paragraph61 />
    </div>
  );
}

function Container161() {
  return (
    <div className="h-[45px] relative shrink-0 w-full" data-name="Container">
      <Container162 />
      <Text65 />
      <Container163 />
    </div>
  );
}

function Container165() {
  return (
    <div className="absolute bg-[#0f5fd7] content-stretch flex items-center justify-center left-0 rounded-[16777200px] size-[28px] top-[8.5px]" data-name="Container">
      <p className="font-['Nunito_Sans:SemiBold',sans-serif] font-semibold leading-[14.7px] relative shrink-0 text-[9.8px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        ED
      </p>
    </div>
  );
}

function Text66() {
  return <div className="absolute bg-[#7ad6a7] border-2 border-[#2c2c2c] border-solid left-[20px] rounded-[16777200px] size-[10px] top-[28.5px]" data-name="Text" />;
}

function Paragraph62() {
  return (
    <div className="h-[18px] overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[18px] left-0 text-[#fff2ed] text-[12px] top-0 whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Emily Davis
      </p>
    </div>
  );
}

function Paragraph63() {
  return (
    <div className="h-[15px] overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[15px] left-0 text-[#c7b8b2] text-[10px] top-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        In Design Voice
      </p>
    </div>
  );
}

function Container166() {
  return (
    <div className="absolute content-stretch flex flex-col h-[33px] items-start left-[38px] top-[6px] w-[394.5px]" data-name="Container">
      <Paragraph62 />
      <Paragraph63 />
    </div>
  );
}

function Container164() {
  return (
    <div className="h-[45px] relative shrink-0 w-full" data-name="Container">
      <Container165 />
      <Text66 />
      <Container166 />
    </div>
  );
}

function Container168() {
  return (
    <div className="absolute bg-[#ec4899] content-stretch flex items-center justify-center left-0 rounded-[16777200px] size-[28px] top-[8.5px]" data-name="Container">
      <p className="font-['Nunito_Sans:SemiBold',sans-serif] font-semibold leading-[14.7px] relative shrink-0 text-[9.8px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        AT
      </p>
    </div>
  );
}

function Text67() {
  return <div className="absolute bg-[#c7b8b2] border-2 border-[#2c2c2c] border-solid left-[20px] rounded-[16777200px] size-[10px] top-[28.5px]" data-name="Text" />;
}

function Paragraph64() {
  return (
    <div className="h-[18px] overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[18px] left-0 text-[#fff2ed] text-[12px] top-0 whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Alex Turner
      </p>
    </div>
  );
}

function Paragraph65() {
  return (
    <div className="h-[15px] overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[15px] left-0 text-[#c7b8b2] text-[10px] top-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        In Lounge
      </p>
    </div>
  );
}

function Container169() {
  return (
    <div className="absolute content-stretch flex flex-col h-[33px] items-start left-[38px] top-[6px] w-[394.5px]" data-name="Container">
      <Paragraph64 />
      <Paragraph65 />
    </div>
  );
}

function Container167() {
  return (
    <div className="h-[45px] relative shrink-0 w-full" data-name="Container">
      <Container168 />
      <Text67 />
      <Container169 />
    </div>
  );
}

function Container171() {
  return (
    <div className="absolute bg-[#8b5cf6] content-stretch flex items-center justify-center left-0 rounded-[16777200px] size-[28px] top-[8.5px]" data-name="Container">
      <p className="font-['Nunito_Sans:SemiBold',sans-serif] font-semibold leading-[14.7px] relative shrink-0 text-[9.8px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        TB
      </p>
    </div>
  );
}

function Text68() {
  return <div className="absolute bg-[#ff8a8a] border-2 border-[#2c2c2c] border-solid left-[20px] rounded-[16777200px] size-[10px] top-[28.5px]" data-name="Text" />;
}

function Paragraph66() {
  return (
    <div className="h-[18px] overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[18px] left-0 text-[#fff2ed] text-[12px] top-0 whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Tom Blake
      </p>
    </div>
  );
}

function Paragraph67() {
  return (
    <div className="h-[15px] overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[15px] left-0 text-[#c7b8b2] text-[10px] top-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Do not disturb
      </p>
    </div>
  );
}

function Container172() {
  return (
    <div className="absolute content-stretch flex flex-col h-[33px] items-start left-[38px] top-[6px] w-[394.5px]" data-name="Container">
      <Paragraph66 />
      <Paragraph67 />
    </div>
  );
}

function Container170() {
  return (
    <div className="h-[45px] relative shrink-0 w-full" data-name="Container">
      <Container171 />
      <Text68 />
      <Container172 />
    </div>
  );
}

function Container157() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] h-[249px] items-start relative shrink-0 w-full" data-name="Container">
      <Container158 />
      <Container161 />
      <Container164 />
      <Container167 />
      <Container170 />
    </div>
  );
}

function Container156() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[272px] items-start relative shrink-0 w-full" data-name="Container">
      <Paragraph57 />
      <Container157 />
    </div>
  );
}

function Container143() {
  return (
    <div className="flex-[461_0_0] min-h-px relative w-[464.5px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[16px] items-start pt-[16px] px-[16px] relative size-full">
        <Container144 />
        <Container156 />
      </div>
    </div>
  );
}

function Container141() {
  return (
    <div className="absolute bg-[#2c2c2c] h-[513px] left-0 rounded-[14px] top-0 w-[466.5px]" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <Container142 />
        <Container143 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#4a403c] border-solid inset-0 pointer-events-none rounded-[14px]" />
    </div>
  );
}

function Icon58() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p37f49070} id="Vector" stroke="var(--stroke-0, #FF4615)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text69() {
  return (
    <div className="flex-[356.945_0_0] h-[21px] min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[21px] left-0 text-[#fff2ed] text-[14px] top-0 whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
          Team Health
        </p>
      </div>
    </div>
  );
}

function Icon59() {
  return (
    <div className="absolute left-[31.55px] size-[12px] top-[2.25px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M2.5 6H9.5" id="Vector" stroke="var(--stroke-0, #C7B8B2)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 2.5L9.5 6L6 9.5" id="Vector_2" stroke="var(--stroke-0, #C7B8B2)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Link17() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[43.555px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[16.5px] left-0 text-[#c7b8b2] text-[11px] top-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>{`Team `}</p>
        <Icon59 />
      </div>
    </div>
  );
}

function Container174() {
  return (
    <div className="h-[50px] relative shrink-0 w-[464.5px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.06)] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center pb-[13px] pt-[16px] px-[16px] relative size-full">
        <Icon58 />
        <Text69 />
        <Link17 />
      </div>
    </div>
  );
}

function Icon60() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p32887f80} id="Vector" stroke="var(--stroke-0, #FFD08A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3694d280} id="Vector_2" stroke="var(--stroke-0, #FFD08A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M12.6667 5.33333V9.33333" id="Vector_3" stroke="var(--stroke-0, #FFD08A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M14.6667 7.33333H10.6667" id="Vector_4" stroke="var(--stroke-0, #FFD08A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container177() {
  return (
    <div className="bg-[#33210a] relative rounded-[8px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[8px] relative size-full">
        <Icon60 />
      </div>
    </div>
  );
}

function Paragraph68() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[18px] left-0 text-[#c7b8b2] text-[12px] top-0 whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Pending invites
      </p>
    </div>
  );
}

function Paragraph69() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[19.5px] left-0 text-[#fff2ed] text-[13px] top-0 whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        3 pending
      </p>
    </div>
  );
}

function Container178() {
  return (
    <div className="flex-[313.555_0_0] h-[37.5px] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph68 />
        <Paragraph69 />
      </div>
    </div>
  );
}

function Link18() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[36.945px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[16.5px] left-0 text-[#c7b8b2] text-[11px] top-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
          Review
        </p>
      </div>
    </div>
  );
}

function Container176() {
  return (
    <div className="bg-[#232323] h-[59.5px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#4a403c] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[13px] py-[11px] relative size-full">
          <Container177 />
          <Container178 />
          <Link18 />
        </div>
      </div>
    </div>
  );
}

function Icon61() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M14.6667 8H1.33333" id="Vector" stroke="var(--stroke-0, #A9CBFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.pf8d0500} id="Vector_2" stroke="var(--stroke-0, #A9CBFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M4 10.6667H4.00667" id="Vector_3" stroke="var(--stroke-0, #A9CBFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6.66667 10.6667H6.67333" id="Vector_4" stroke="var(--stroke-0, #A9CBFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container180() {
  return (
    <div className="bg-[#101d36] relative rounded-[8px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[8px] relative size-full">
        <Icon61 />
      </div>
    </div>
  );
}

function Paragraph70() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[18px] left-0 text-[#c7b8b2] text-[12px] top-0 whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Storage used
      </p>
    </div>
  );
}

function Paragraph71() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[19.5px] left-0 text-[#fff2ed] text-[13px] top-0 whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        12.4 GB / 50 GB
      </p>
    </div>
  );
}

function Container181() {
  return (
    <div className="flex-[309.898_0_0] h-[37.5px] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph70 />
        <Paragraph71 />
      </div>
    </div>
  );
}

function Link19() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[40.602px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[16.5px] left-0 text-[#c7b8b2] text-[11px] top-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
          Manage
        </p>
      </div>
    </div>
  );
}

function Container179() {
  return (
    <div className="bg-[#232323] h-[59.5px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#4a403c] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[13px] py-[11px] relative size-full">
          <Container180 />
          <Container181 />
          <Link19 />
        </div>
      </div>
    </div>
  );
}

function Icon62() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p32887f80} id="Vector" stroke="var(--stroke-0, #7AD6A7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3694d280} id="Vector_2" stroke="var(--stroke-0, #7AD6A7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1f197700} id="Vector_3" stroke="var(--stroke-0, #7AD6A7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3bf3e100} id="Vector_4" stroke="var(--stroke-0, #7AD6A7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container183() {
  return (
    <div className="bg-[#10261c] relative rounded-[8px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[8px] relative size-full">
        <Icon62 />
      </div>
    </div>
  );
}

function Paragraph72() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[18px] left-0 text-[#c7b8b2] text-[12px] top-0 whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Team members
      </p>
    </div>
  );
}

function Paragraph73() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[19.5px] left-0 text-[#fff2ed] text-[13px] top-0 whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        5 active · 1 viewer
      </p>
    </div>
  );
}

function Container184() {
  return (
    <div className="flex-[325.016_0_0] h-[37.5px] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph72 />
        <Paragraph73 />
      </div>
    </div>
  );
}

function Link20() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[25.484px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[16.5px] left-0 text-[#c7b8b2] text-[11px] top-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
          View
        </p>
      </div>
    </div>
  );
}

function Container182() {
  return (
    <div className="bg-[#232323] h-[59.5px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#4a403c] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[13px] py-[11px] relative size-full">
          <Container183 />
          <Container184 />
          <Link20 />
        </div>
      </div>
    </div>
  );
}

function Icon63() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p18f7f580} id="Vector" stroke="var(--stroke-0, #C7B8B2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p4317f80} id="Vector_2" stroke="var(--stroke-0, #C7B8B2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container186() {
  return (
    <div className="bg-[#262322] relative rounded-[8px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[8px] relative size-full">
        <Icon63 />
      </div>
    </div>
  );
}

function Paragraph74() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[18px] left-0 text-[#c7b8b2] text-[12px] top-0 whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Permissions
      </p>
    </div>
  );
}

function Paragraph75() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[19.5px] left-0 text-[#fff2ed] text-[13px] top-0 whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        All roles configured
      </p>
    </div>
  );
}

function Container187() {
  return (
    <div className="flex-[362.5_0_0] h-[37.5px] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph74 />
        <Paragraph75 />
      </div>
    </div>
  );
}

function Container185() {
  return (
    <div className="bg-[#232323] h-[59.5px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#4a403c] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[13px] py-[11px] relative size-full">
          <Container186 />
          <Container187 />
        </div>
      </div>
    </div>
  );
}

function Container175() {
  return (
    <div className="flex-[461_0_0] min-h-px relative w-[464.5px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[12px] items-start pt-[16px] px-[16px] relative size-full">
        <Container176 />
        <Container179 />
        <Container182 />
        <Container185 />
      </div>
    </div>
  );
}

function Container173() {
  return (
    <div className="absolute bg-[#2c2c2c] h-[513px] left-[482.5px] rounded-[14px] top-0 w-[466.5px]" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <Container174 />
        <Container175 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#4a403c] border-solid inset-0 pointer-events-none rounded-[14px]" />
    </div>
  );
}

function Container140() {
  return (
    <div className="h-[513px] relative shrink-0 w-full" data-name="Container">
      <Container141 />
      <Container173 />
    </div>
  );
}

function Container15() {
  return (
    <div className="flex-[715_0_0] min-h-px relative w-[989px]" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[20px] items-start pt-[20px] px-[20px] relative size-full">
          <Container16 />
          <Container18 />
          <Container46 />
          <Container100 />
          <Container140 />
        </div>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute bg-[#232323] content-stretch flex flex-col h-[789px] items-start left-0 overflow-clip right-0 top-[73px]" data-name="Container">
      <Container15 />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute inset-[2.26%_0.75%_3.01%_0] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_-0.316px] mask-size-[14px_14px]" style={{ maskImage: `url('${imgGroup}')` }} data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.8947 13.2631">
        <g id="Group">
          <path d={svgPaths.p2a6aad00} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ClipPathGroup() {
  return (
    <div className="absolute contents inset-0" data-name="Clip path group">
      <Group />
    </div>
  );
}

function Icon64() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <ClipPathGroup />
      </div>
    </div>
  );
}

function Container188() {
  return (
    <div className="bg-[#ff4615] relative rounded-[6px] shrink-0 size-[24px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[5px] relative size-full">
        <Icon64 />
      </div>
    </div>
  );
}

function Text70() {
  return (
    <div className="h-[14px] relative shrink-0 w-[84px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="-translate-x-1/2 absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[14px] left-[42.32px] text-[#fff2ed] text-[14px] text-center top-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
          Design Team
        </p>
      </div>
    </div>
  );
}

function Text71() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-[84px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="-translate-x-1/2 absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[15px] left-[43.5px] text-[#c7b8b2] text-[10px] text-center top-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
          Website Redesign
        </p>
      </div>
    </div>
  );
}

function Container189() {
  return (
    <div className="flex-[84_0_0] h-[31px] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative size-full">
        <Text70 />
        <Text71 />
      </div>
    </div>
  );
}

function Icon65() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d="M3.5 5.25L7 8.75L10.5 5.25" id="Vector" stroke="var(--stroke-0, #C7B8B2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Button21() {
  return (
    <div className="absolute bg-[#232323] content-stretch flex gap-[10px] h-[49px] items-center left-[19px] px-[14px] py-[10px] rounded-[10px] top-[11px] w-[170px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#4a403c] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container188 />
      <Container189 />
      <Icon65 />
    </div>
  );
}

function Icon66() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p107a080} id="Vector" stroke="var(--stroke-0, #C7B8B2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M14 14L11.1333 11.1333" id="Vector_2" stroke="var(--stroke-0, #C7B8B2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function TextInput() {
  return (
    <div className="flex-[420_0_0] h-[21px] min-w-px relative" data-name="Text Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#5f514b] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
          Search people, tasks, files, channels...
        </p>
      </div>
    </div>
  );
}

function Text72() {
  return (
    <div className="flex-[1_0_0] h-[15px] min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Nunito_Sans:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[15px] left-[0.11px] text-[#c7b8b2] text-[10px] top-[-0.75px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
          ⌘K
        </p>
      </div>
    </div>
  );
}

function Container191() {
  return (
    <div className="bg-[#262322] h-[21px] relative rounded-[4px] shrink-0 w-[32px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#4a403c] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[8px] py-px relative size-full">
        <Text72 />
      </div>
    </div>
  );
}

function Container190() {
  return (
    <div className="absolute bg-[#232323] content-stretch flex gap-[8.113px] h-[39px] items-center left-[261px] pl-[14px] pr-[13.887px] py-px rounded-[10px] top-[16px] w-[512px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#4a403c] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Icon66 />
      <TextInput />
      <Container191 />
    </div>
  );
}

function Icon67() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M3.33333 8H12.6667" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 3.33333V12.6667" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text73() {
  return (
    <div className="flex-[1_0_0] h-[21px] min-w-px relative" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[21px] left-[15px] text-[14px] text-center text-white top-0 whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        New
      </p>
    </div>
  );
}

function Container193() {
  return (
    <div className="absolute bg-[#ff4615] content-stretch flex gap-[6px] h-[37px] items-center left-0 px-[12px] py-[8px] rounded-[10px] top-[0.5px] w-[75.578px]" data-name="Container">
      <Icon67 />
      <Text73 />
    </div>
  );
}

function Icon68() {
  return (
    <div className="absolute left-[9.25px] size-[16.438px] top-[9.25px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.4375 16.4375">
        <g id="Icon">
          <path d={svgPaths.p34e026a0} id="Vector" stroke="var(--stroke-0, #FFF2ED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.36979" />
          <path d={svgPaths.p4c01700} id="Vector_2" stroke="var(--stroke-0, #FFF2ED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.36979" />
        </g>
      </svg>
    </div>
  );
}

function Container194() {
  return (
    <div className="absolute bg-[#ff4615] content-stretch flex items-center justify-center left-[22.61px] rounded-[8.219px] size-[16.438px] top-[-4.11px]" data-name="Container">
      <p className="font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[15.417px] relative shrink-0 text-[10.278px] text-center text-white whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        3
      </p>
    </div>
  );
}

function Button22() {
  return (
    <div className="absolute bg-[#232323] border border-[#4a403c] border-solid left-[83.58px] rounded-[10.278px] size-[38px] top-0" data-name="Button">
      <Icon68 />
      <Container194 />
    </div>
  );
}

function Container192() {
  return (
    <div className="absolute h-[38px] left-[846.42px] top-[14px] w-[121.578px]" data-name="Container">
      <Container193 />
      <Button22 />
    </div>
  );
}

function TopNav() {
  return (
    <div className="absolute bg-[#2c2c2c] border border-[#4a403c] border-solid h-[73px] left-0 rounded-[20px] top-0 w-[989px]" data-name="TopNav">
      <Button21 />
      <Container190 />
      <Container192 />
    </div>
  );
}

function MainContent() {
  return (
    <div className="bg-[#232323] flex-[989_0_0] h-[789px] min-w-px relative" data-name="Main Content">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <Container14 />
        <TopNav />
      </div>
    </div>
  );
}

function Body() {
  return (
    <div className="absolute bg-[#232323] content-stretch flex gap-[12px] h-[813px] items-start left-0 overflow-clip p-[12px] top-0 w-[1099px]" data-name="Body">
      <Sidebar />
      <MainContent />
    </div>
  );
}

export default function Rally() {
  return (
    <div className="bg-[#232323] relative size-full" data-name="Rally">
      <Body />
    </div>
  );
}