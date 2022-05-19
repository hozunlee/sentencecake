import { firebase_db } from "firebaseConfig";
import React from "react";

const Home = () => {
    type sentence = {
        idx: number;
        from: string;
        author: string;
        keyword: [];
        item: string;
    };

    const [data, setData] = React.useState<sentence[]>([]);

    React.useEffect(() => {
        //뒤의 1000 숫자는 1초를 뜻함
        //1초 뒤에 실행되는 코드들이 담겨 있는 함수
        setTimeout(() => {
            //꿀팁 데이터로 모두 초기화 준비
            firebase_db
                .ref("/data")
                .once("value")
                .then((snapshot) => {
                    console.log("파이어베이스에서 데이터 가져왔습니다!!");
                    let wording = snapshot.val();
                    setData(wording);
                });
        }, 500);
    }, []);
    return (
        <div>
            hello
            <div>
                {data === undefined ? (
                    <></>
                ) : (
                    <div>
                        {data.map((item) => {
                            return (
                                <button className="w-10 border-2">
                                    {item.item}
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
