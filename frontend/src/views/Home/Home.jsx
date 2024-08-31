import { Container, Text } from "@radix-ui/themes";
//import { slide as Menu } from 'react-burger-menu';
import Navbar from "./components/Navbar";
import Features from "./components/Features";
import AboutUs from "./components/AboutUs";
import News from "./components/News";
import Opinions from "./components/Opinions";

const Home = () => {
  return (
    <Container className="relative gap-2 w-full flex-col" >
      <Navbar />
      <section className="pl-12 pr-6 py-20 max-w-lg">
        <div>
          <Text weight="medium" size="8">Lorem, ipsum dolor sit amet consectetur</Text>
        </div>
        <div>
          <Text> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur, consequatur repellendus asperiores facilis voluptas, quibusdam illo omnis ratione amet, quo fuga. Quo dolore adipisci aperiam possimus animi alias ratione odit! </Text>
        </div>
      </section>
      <section>
        <Features />
      </section>
      <section>
        <AboutUs/>
      </section>
      <section>
        <News/>
      </section>
      <section>
        <Opinions/>
      </section>
    </Container>
  )
}
export default Home

