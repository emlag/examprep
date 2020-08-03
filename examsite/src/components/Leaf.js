import { useSpring, a } from "react-spring";
import { useMeasure, usePrevious } from "./helpers";
import { Global, Frame, Title, Content, toggle } from "./styles";
import * as Icons from "./icons";
import React, { memo, useState } from "react";
import * as firebase from "firebase";
import * as cnst from "./Const";

const Leaf = memo(({ children, name, subtopic, style, defaultOpen = false }) => {
  const [isOpen, setOpen] = useState(defaultOpen);
  const previous = usePrevious(isOpen);
  const [info, setInfo] = useState("--");

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
            querySnapshot.forEach(doc => {
                {
                    let data = doc.data();
                    if (doc.exists) {
                        let data = doc.data();

                        console.log("questions with subtopic " + subtopic);
                        console.log("Document data:", data.id);
                        console.log("Document data:", data);
                        setInfo(data.year + " " + data.session + " " + "P" + data.paperType + data.level + " " + "Q" + data.questionNum);
                    } else {
                        console.log("No such document!");
                    }
                }
            });
            // .catch(error => {
            //   //TODO: doesn't work
            //   this.setState({ data: null });
            //   console.log("Error getting document:", error);
            // });
        });
    };

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
            {info}
        </a.div>
      </Content>
    </Frame>
  );
});

export default Leaf;
