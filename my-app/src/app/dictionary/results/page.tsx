import { posts } from '@/app/lib/placeholder-data';
import Post from '@/app/ui/components/posts/post';

export default function Page() {
  return (
    <main>
      <div className="border border-gray-200 p-4 my-4">
        <h2 className="text-2xl text-black-700 justify-left p-2 mb-4">
          Results for blood...
        </h2>
        <div className="flex justify-between">
          {/* English Definition */}
          <div className="w-1/2 pr-4">
            <h2 className="text-3xl text-emerald-500 justify-left p-2">Blood</h2>
            <p className="justify-left p-4">the red liquid that circulates in the arteries and veins of humans and other vertebrate animals, carrying oxygen to and carbon dioxide from the tissues of the body.
            </p>
          </div>
          {/* Spanish Definition */}
          <div className="w-1/2 pl-4">
          <h2 className="text-3xl text-emerald-500 justify-left p-2">Sangre</h2>
            <p className="justify-left p-4">
              Líquido, generalmente de color rojo, que circula por las arterias y venas del cuerpo de los animales, se compone de una parte líquida o plasma y de células en suspensión: hematíes, leucocitos y plaquetas, y cuya función es distribuir oxígeno, nutrientes y otras sustancias a las células del organismo, y recoger de estas los productos de desecho.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}