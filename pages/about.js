import Image from 'next/image';
import { playlist } from '../data/data'

const About = ({playlistLists}) => {
    return <div>
      <h1>About Us </h1>
      <ul>
        {playlistLists && playlistLists.map((playlist) => {
        return (
          <li key={playlist.id}>
            <span>
              { playlist.name }
              <Image
                src={playlist.albumCoverUrl}
                alt="Picture of the author"
                width={200}
                height={200}
              />
            </span>
          </li>
        )
        })
        }
      </ul>
    </div>
};
  
export default About;
  
export async function getStaticProps() {
    return {
        props: {
            playlistLists: playlist
        }
    }
}
