import { useState } from 'react';
import subjectData from './dataSubject.json';
import './counter.css';
function Excersise_126() {
  const subjects = subjectData?.subject;

  const [searchSubject, setSearchItem] = useState('');
  const [filterSubject, setFilterSubject] = useState(subjects);

  const handleChange = (event) => {
    const searchTerm = event.target.value;
    setSearchItem(searchTerm);

    const filteredSubjects = subjects.filter(
      (subject) =>
        subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subject.id.toString().includes(searchTerm)
    );

    setFilterSubject(filteredSubjects);
  };

  return (
    <>
      <div className='search-section'>
        <div>
          <form>
            <label>
              Search
              <input
                type='text'
                name='search'
                value={searchSubject}
                onChange={handleChange}
              />
            </label>
          </form>
        </div>
        <div>
          <ul>
            {filterSubject?.map((subject) => {
              return <li key={subject?.id}>{subject?.name}</li>;
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Excersise_126;
