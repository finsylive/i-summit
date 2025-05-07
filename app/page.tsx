// app/page.tsx

import AssociationPage from "./association/page"  // <— relative import
import HomePage from "./home/page"
import RoadmapPage from "./RoadMap/page"
import ProgramsPage from "./programs/page"
import RewardsPage from "./rewards/page"
import IdeathonPage from "./ideathon/page"
// …

export default function Home() {
  return (
    <main className="…">
      {/* your existing Home content */}

      <HomePage/>
      <AssociationPage />
      <ProgramsPage/>
      <IdeathonPage/>
      <RoadmapPage/>
      <RewardsPage/>
      
      {/* <TimelineDemo /> */}

    </main>
  )
}
