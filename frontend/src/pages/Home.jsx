import React, { useEffect, useState } from 'react';
import { useSpring, animated, config } from 'react-spring';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const AnimatedRow = animated.tr;

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/books')
      .then((response) => {
        console.log('Response:', response.data);
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const springProps = useSpring({
    opacity: 1,
    transform: 'translateY(0px)',
    from: { opacity: 0, transform: 'translateY(-50px)' },
    config: config.wobbly,
  });

  return (
    <div
      className='p-8 text-gray-800 rounded-md shadow-lg'
      style={{
        backgroundImage: `url('C:/Users/Hp/OneDrive/Desktop/Mern_project/frontend/src/pages/book-stack-library-room-blurred-bookshelf-background_42691-514.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-4xl font-bold tracking-wide'>Discover Amazing Books</h1>
        <Link to='/books/create'>
          <MdOutlineAddBox className='text-3xl hover:text-gray-500 transition duration-300' />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className='w-full table-auto'>
          <thead>
            <tr className='bg-blue-300'>
              <th className='border p-2'>No</th>
              <th className='border p-2'>Title</th>
              <th className='border p-2 hidden md:table-cell'>Author</th>
              <th className='border p-2 hidden md:table-cell'>Publish Year</th>
              <th className='border p-2'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <AnimatedRow
                key={book._id}
                style={{ ...springProps, marginBottom: '8px' }}
                className={`h-12 ${
                  index % 2 === 0 ? 'bg-blue-100' : 'bg-gray-50'
                } hover:shadow-md transition duration-300`}
              >
                <td className='border p-2 text-center'>{index + 1}</td>
                <td className='border p-2'>{book.title}</td>
                <td className='border p-2 hidden md:table-cell'>{book.author}</td>
                <td className='border p-2 hidden md:table-cell'>
                  {book.publishYear || 'N/A'}
                </td>
                <td className='border p-2'>
                  <div className='flex justify-center gap-4'>
                    <Link to={`./books/details/${book._id}`}>
                      <BsInfoCircle className='text-2xl hover:text-green-500 transition duration-300' />
                    </Link>
                    <Link to={`./books/edit/${book._id}`}>
                      <AiOutlineEdit className='text-2xl hover:text-yellow-500 transition duration-300' />
                    </Link>
                    <Link to={`./books/delete/${book._id}`}>
                      <MdOutlineDelete className='text-2xl hover:text-red-500 transition duration-300' />
                    </Link>
                  </div>
                </td>
              </AnimatedRow>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
