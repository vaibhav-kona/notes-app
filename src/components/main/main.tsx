import { FoldersWrapper } from '../folders';
import styles from './main.module.scss';
import { Notes } from '../notes';
import { NoteEditor } from '../noteEditor';

const Main = () => {
  return (
    <article>
      <h1>My Notes</h1>
      {/* TODO: Title, header components are needed */}
      <div className={styles.main}>
        <FoldersWrapper />
        <Notes />
        <NoteEditor />
      </div>
    </article>
  );
};

export default Main;
