import Greetings from "components/Hello";
import Letter from "components/letter";
import { firebase_db } from "firebaseConfig";
import React, { useEffect, useState } from "react";

const Home = () => {
    type sentence = {
        idx: number;
        img?: string;
        from: string;
        author: string;
        keyword: [];
        item: string;
    };

    const [data, setData] = useState<sentence[]>([]);
    const [todaysQuote, setTodaysQuote] = useState<sentence>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        firebase_db
            .ref("/data")
            .once("value")
            .then((snapshot) => {
                console.log("파이어베이스에서 데이터 가져왔습니다!!");
                let wording = snapshot.val();
                setData(wording);
                setLoading(true);
            });
    }, []);

    useEffect(() => {
        console.log("data받아온", data);
        let todaysQuote1 = data[Math.floor(Math.random() * data.length)];
        setTodaysQuote(todaysQuote1);
    }, [data]);

    return (
        <div>
            <div>
                {todaysQuote === undefined ? (
                    <>하이하이</>
                ) : (
                    <div className="flex-col justify-center items-center w-screen ">
                        <Letter imgSrc={todaysQuote.img} />
                        <div className="w-full flex-col justify-center text-center my-10">
                            <div className="">{todaysQuote.item}</div>
                            <div className="">{todaysQuote.from}</div>
                            <div>{todaysQuote.author}</div>
                            <div className="flex justify-center">
                                {todaysQuote.keyword.map((keyword, index) => {
                                    return (
                                        <div key={index}>
                                            <button className="text-sm border rounded-2xl p-2 cursor-pointer shadow-sm bg-blue-400 ">
                                                {keyword}{" "}
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
