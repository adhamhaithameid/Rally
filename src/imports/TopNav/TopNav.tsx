import svgPaths from "./svg-p3anza2v63";
import { imgGroup } from "./svg-y9fwq";

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

function Icon() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <ClipPathGroup />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="bg-[#ff4615] relative rounded-[6px] shrink-0 size-[24px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[5px] relative size-full">
        <Icon />
      </div>
    </div>
  );
}

function Text() {
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

function Text1() {
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

function Container1() {
  return (
    <div className="flex-[84_0_0] h-[31px] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative size-full">
        <Text />
        <Text1 />
      </div>
    </div>
  );
}

function Icon1() {
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

function Button() {
  return (
    <div className="absolute bg-[#232323] content-stretch flex gap-[10px] h-[49px] items-center left-[19px] px-[14px] py-[10px] rounded-[10px] top-[11px] w-[170px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#4a403c] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container />
      <Container1 />
      <Icon1 />
    </div>
  );
}

function Icon2() {
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

function Text2() {
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

function Container3() {
  return (
    <div className="bg-[#262322] h-[21px] relative rounded-[4px] shrink-0 w-[32px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#4a403c] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[8px] py-px relative size-full">
        <Text2 />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute bg-[#232323] content-stretch flex gap-[8.113px] h-[39px] items-center left-[261px] pl-[14px] pr-[13.887px] py-px rounded-[10px] top-[16px] w-[512px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#4a403c] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Icon2 />
      <TextInput />
      <Container3 />
    </div>
  );
}

function Icon3() {
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

function Text3() {
  return (
    <div className="flex-[1_0_0] h-[21px] min-w-px relative" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[21px] left-[15px] text-[14px] text-center text-white top-0 whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        New
      </p>
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute bg-[#ff4615] content-stretch flex gap-[6px] h-[37px] items-center left-0 px-[12px] py-[8px] rounded-[10px] top-[0.5px] w-[75.578px]" data-name="Container">
      <Icon3 />
      <Text3 />
    </div>
  );
}

function Icon4() {
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

function Container6() {
  return (
    <div className="absolute bg-[#ff4615] content-stretch flex items-center justify-center left-[22.61px] rounded-[8.219px] size-[16.438px] top-[-4.11px]" data-name="Container">
      <p className="font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[15.417px] relative shrink-0 text-[10.278px] text-center text-white whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        3
      </p>
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute bg-[#232323] border border-[#4a403c] border-solid left-[83.58px] rounded-[10.278px] size-[38px] top-0" data-name="Button">
      <Icon4 />
      <Container6 />
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute h-[38px] left-[846.42px] top-[14px] w-[121.578px]" data-name="Container">
      <Container5 />
      <Button1 />
    </div>
  );
}

export default function TopNav() {
  return (
    <div className="bg-[#2c2c2c] border border-[#4a403c] border-solid relative rounded-[20px] size-full" data-name="TopNav">
      <Button />
      <Container2 />
      <Container4 />
    </div>
  );
}