import { Link } from "react-router-dom";

function gearPath(radius, teeth, depth, hole) {
  const point = (distance, angle) =>
    `${(distance * Math.cos(angle)).toFixed(1)} ${(distance * Math.sin(angle)).toFixed(1)}`;
  const step = (2 * Math.PI) / teeth;
  let path = "";
  for (let index = 0; index < teeth; index += 1) {
    const angle = index * step;
    path += `${index ? "L" : "M"}${point(radius - depth, angle)}L${point(radius, angle + step * 0.12)}L${point(radius, angle + step * 0.38)}L${point(radius - depth, angle + step * 0.5)}`;
  }
  return `${path}Z M${hole} 0a${hole} ${hole} 0 1 0 ${-2 * hole} 0a${hole} ${hole} 0 1 0 ${2 * hole} 0Z`;
}

function Gear({ className, teeth, depth, hole, fill }) {
  return (
    <svg className={className} viewBox="-100 -100 200 200">
      <g>
        <path
          d={gearPath(92, teeth, depth, hole)}
          fill={fill}
          fillRule="evenodd"
          stroke="#16132B"
          strokeWidth="5"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

export default function Hero() {
  return (
    <div className="hero">
      <div className="wrap">
        <div>
          <h1>
            La casa de las <span>altas capacidades</span> en Zamora
          </h1>
          <p>
            Somos familias con niños y niñas con altas capacidades
            intelectuales. Nos juntamos para que ellos se sientan parte de un
            grupo y nosotros, acompañados.
          </p>
          <Link className="btn" to="/contacto">
            Escríbenos
          </Link>
          <Link className="btn alt" to="/quienes">
            Conócenos
          </Link>
        </div>
        <div className="art" aria-hidden="true">
          <img className="logo" src="/logo.png" alt="" />
          <Gear className="g1" teeth={12} depth={25} hole={30} fill="#FFD23F" />
          <Gear className="g2" teeth={10} depth={22} hole={28} fill="#6b4dff" />
          <Gear className="g3" teeth={8} depth={24} hole={26} fill="#ffaaaa" />
          <Gear className="g4" teeth={10} depth={26} hole={24} fill="#4CC9F0" />
        </div>
      </div>
    </div>
  );
}
