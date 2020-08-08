import { useSpring, a } from "react-spring";
import { useMeasure, usePrevious } from "./helpers";
import { Global, Frame, Title, Content, toggle } from "./styles";
import * as Icons from "./icons";
import React, { memo, useState } from "react";
import * as firebase from "firebase";
import * as cnst from "./Const";
import QuestionModal from "./QuestionModal";
import CircularProgress from "@material-ui/core/CircularProgress";


const Leaf = memo(({ children, name, subtopic, style, defaultOpen = false }) => {
  const [isOpen, setOpen] = useState(defaultOpen);
  const previous = usePrevious(isOpen);
  const [infoFound, setInfoFound] = useState(true);
  const [allInfo, setAllInfo] = useState([]);

  const [bind, { height: viewHeight }] = useMeasure();
  const { height, opacity, transform } = useSpring({
    from: { height: 0, opacity: 0, transform: "translate3d(20px,0,0)" },
    to: {
      height: isOpen ? viewHeight : 0,
      opacity: isOpen ? 1 : 0,
      transform: `translate3d(${isOpen ? 0 : 20}px,0,0)`
    }
  });
  const Icon =
    Icons[`${children ? (isOpen ? "Minus" : "Plus") : "Close"}SquareO`];


  function queryTopic(subtopic){
        //rename input
        const db = firebase.firestore();

        //https://stackoverflow.com/questions/48479717/how-do-i-render-firestore-data-in-react
        const questionRef = db.collection(cnst.DATABASE_BRANCH);

        // const query = questionRef.where("subtopics", "array-contains", e);
        const query = questionRef.where("subtopics", "array-contains", subtopic);

        query.get().then(querySnapshot => {
            let infoFound = [];

            querySnapshot.forEach(doc => {
                {
                    let data = doc.data();
                    if (doc.exists) {
                        let data = doc.data();

                        console.log("questions with subtopic " + subtopic);
                        console.log("Document data:", data.id);
                        console.log("Document data:", data);
                        infoFound.push(data)
                        //setInfo(data.year + " " + data.session + " " + "P" + data.paperType + data.level + " " + "Q" + data.questionNum);
                    } else {
                        console.log("No such document!");
                    }
                }
            });

            if (infoFound === undefined || infoFound.length == 0) {
                setInfoFound(false);
            }
            setAllInfo(infoFound);
        });
    };

  function allInfoDivs() {

      if(!infoFound) {
          return (
              <div style={{ color: "red" }}>
                  No Questions Found for this Subtopic :(
              </div>
          )
      }

      if (allInfo === undefined || allInfo.length == 0) {
          return (
              <CircularProgress />
          )
      }

      const divs = allInfo.map((data, idx) => {
          const title = data.year + " " + data.session + " " + "P" + data.paperType + data.level + " " + "Q" + data.questionNum;
          return (
              <div>
                  {/*{title}*/}
                  <QuestionModal title={title} data={data}>

                  </QuestionModal>
              </div>
          )
      })

      return divs;
  }

  return (
    <Frame>
      <Icon
        style={{ ...toggle, opacity: children ? 1 : 0.3 }}
        onClick={() => {setOpen(!isOpen); queryTopic(subtopic);}}
      />
      <Title style={style}>{name}</Title>
      <Content
        style={{
          opacity,
          height: isOpen && previous === isOpen ? "auto" : height
        }}
      >
        <a.div style={{ transform }} {...bind} children={children} >
            {allInfoDivs()}
        </a.div>
      </Content>
    </Frame>
  );
});

export default Leaf;
