import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
  return (
    <main>
      <h1>🚗 Car go - 1박 2일 드라이브 코스 추천</h1>
      <p>테마를 선택하고 추천받아보세요!</p>
      <button>코스 추천 시작하기</button>
    </main>
  );
}
