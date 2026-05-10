import svgPaths from "./svg-jwg80ao7oc";

function Icon() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_491_59)" id="Icon">
          <path d={svgPaths.pca582c0} fill="var(--fill-0, white)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_491_59">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
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

function Paragraph() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[14px] left-0 text-[#fff2ed] text-[14px] top-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Design Team
      </p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[15px] left-0 text-[#c7b8b2] text-[10px] top-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Website Redesign
      </p>
    </div>
  );
}

function Container1() {
  return (
    <div className="flex-[1_0_0] h-[31px] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative size-full">
        <Paragraph />
        <Paragraph1 />
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
    <div className="absolute bg-[#232323] content-stretch flex gap-[10px] h-[49px] items-center left-[19px] px-[13px] py-[9px] rounded-[10px] top-[12px] w-[170.18px]" data-name="Button">
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
    <div className="flex-[424.227_0_0] h-[21px] min-w-px relative" data-name="Text Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#c7b8b2] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
          Search people, tasks, files, channels...
        </p>
      </div>
    </div>
  );
}

function Kbd() {
  return (
    <div className="bg-[#262322] h-[21px] relative rounded-[4px] shrink-0 w-[29.773px]" data-name="Kbd">
      <div aria-hidden="true" className="absolute border border-[#4a403c] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[7px] py-[3px] relative size-full">
        <p className="font-['Nunito_Sans:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[15px] relative shrink-0 text-[#c7b8b2] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
          ⌘K
        </p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="-translate-x-1/2 absolute bg-[#232323] content-stretch flex gap-[8px] h-[39px] items-center left-[calc(50%+23.5px)] px-[13px] py-[9px] rounded-[10px] top-[17px] w-[512px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#4a403c] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Icon2 />
      <TextInput />
      <Kbd />
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

function Text() {
  return (
    <div className="flex-[1_0_0] h-[21px] min-w-px relative" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[21px] left-[15px] text-[14px] text-center text-white top-0 whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        New
      </p>
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute bg-[#ff4615] content-stretch flex gap-[6px] h-[37px] items-center left-[0.42px] px-[12px] py-[8px] rounded-[10px] top-[3px] w-[75.578px]" data-name="Button">
      <Icon3 />
      <Text />
    </div>
  );
}

function Icon4() {
  return (
    <div className="absolute left-[9.25px] size-[16.444px] top-[9.25px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.4444 16.4444">
        <g id="Icon">
          <path d={svgPaths.p35a5e100} id="Vector" stroke="var(--stroke-0, #FFF2ED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.37037" />
          <path d={svgPaths.p13ce8800} id="Vector_2" stroke="var(--stroke-0, #FFF2ED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.37037" />
        </g>
      </svg>
    </div>
  );
}

function Text1() {
  return (
    <div className="absolute bg-[#ff4615] content-stretch flex items-center justify-center left-[22.61px] px-[4.111px] rounded-[17243234px] size-[16.444px] top-[-4.11px]" data-name="Text">
      <p className="font-['Nunito_Sans:Medium',sans-serif] font-medium leading-[15.417px] relative shrink-0 text-[10.278px] text-center text-white whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        3
      </p>
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute bg-[#232323] border-[#4a403c] border-[1.028px] border-solid left-[84px] rounded-[10.278px] size-[38px] top-[2px]" data-name="Button">
      <Icon4 />
      <Text1 />
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute h-[40px] left-[845px] top-[15px] w-[123px]" data-name="Container">
      <Button1 />
      <Button2 />
    </div>
  );
}

export default function Header() {
  return (
    <div className="bg-[#2c2c2c] border-[#4a403c] border-b border-l border-r border-solid relative rounded-bl-[20px] rounded-br-[20px] size-full" data-name="Header">
      <Button />
      <Container2 />
      <Container3 />
    </div>
  );
}