import svgPaths from "./svg-gyowvurp60";

function Group() {
  return (
    <div className="absolute left-[206px] size-[177px] top-0">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 177 177">
        <g id="Group 32">
          <rect fill="var(--fill-0, #FFE1D2)" height="177" id="Rectangle 30" rx="30" width="177" />
          <path d={svgPaths.p6b466c0} fill="var(--fill-0, #FF4615)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute left-0 size-[177px] top-0">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 177 177">
        <g id="Group 33">
          <rect fill="var(--fill-0, #191919)" height="177" id="Rectangle 30" rx="30" width="177" />
          <path d={svgPaths.p6b466c0} fill="var(--fill-0, #FF4615)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents left-0 top-0">
      <Group />
      <Group1 />
    </div>
  );
}

export default function Frame() {
  return (
    <div className="relative size-full">
      <div className="relative size-full">
        <Group2 />
      </div>
      <div aria-hidden="true" className="absolute border-10 border-solid border-white inset-[-5px] pointer-events-none" />
    </div>
  );
}