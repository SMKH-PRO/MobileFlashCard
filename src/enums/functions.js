import { setState, setLoading } from '../redux/actions'
import { ToastAndroid } from 'react-native'

export const LongToast=msg=>ToastAndroid.show(msg,ToastAndroid.LONG)
export const ShortToast=msg=>ToastAndroid.show(msg,ToastAndroid.SHORT)

const FLASHCARDS_STORAGE_KEY = "flashcards_data";
const generateUID = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}
const initialData = () => {
  return {
    "632mgp7hm68vzvg2amz1hq": {
      id: "632mgp7hm68vzvg2amz1hq",
      title: "React",
      questions: [
        {
          question: "What is ReactJS?",
          answer:
            "ReactJS is an open-source frontend JavaScript library which is used for building user interfaces, specifically for single page applications."
        },
        {
          question: "What is JSX?",
          answer:
            "JSX is a syntax notation for JavaScript XML(XML-like syntax extension to ECMAScript). It stands for JavaScript XML."
        },
        {
          question: "What is virtual DOM?",
          answer:
            "The virtual DOM (VDOM) is an in-memory representation of Real DOM."
        },
        {
          question: "What is Babel?",
          answer: "Babel is a JavaScript compiler"
        }
      ]
    },
    "724mgp7hm68vzvg2amz1hq": {
      id: "724mgp7hm68vzvg2amz1hq",
      title: "HTML",
      questions: [
        {
          question: "What does HTML stand for?",
          answer: "Hyper Text Markup Language"
        },
        {
          question: "What should values always be enclosed in?",
          answer: "Quotation marks"
        },
        {
          question:
            "Where do all items for the same web site need to be saved?",
          answer: "In the same folder"
        },
        {
          question:
            "What is always a welcome page, and explains the purpose or topic of the site?",
          answer: "Home Page"
        }
      ]
    },
    "636jgrwdbhf58lxznh9q79": {
      id: "636jgrwdbhf58lxznh9q79",
      title: "CSS",
      questions: [
        {
          question: "What is CSS?",
          answer: "It describes how the HTML content will be shown on screen."
        },
        {
          question: "What are gradients in CSS?",
          answer:
            "It is a property of CSS which allows you to display a smooth transformation between two or more than two specified colors."
        },
        {
          question: "What is a CSS pseudo-class?",
          answer:
            "It is a class that is used to define a special state of an HTML element."
        },
        {
          question: "What is CSS opacity?",
          answer:
            "It is the property that elaborates on the transparency of an element."
        }
      ]
    },
    sxbjgrwdbhf58lxznh9q79: {
      id: "sxbjgrwdbhf58lxznh9q79",
      title: "Capital Cities",
      questions: [
        {
          question: "What is the capital city of Germany?",
          answer: "Berlin"
        },
        {
          question: "What is the capital city of France?",
          answer: "Paris"
        },
        {
          question: "What is the capital city of Belgium?",
          answer: "Brüssel"
        },
        {
          question: "What is the capital city of Netherlands?",
          answer: "Amsterdam"
        },
        {
          question: "What is the capital city of Portugal?",
          answer: "Lisbon"
        }
      ]
    }
  };
}

export const loadDecks =  (dispatch) => {
  dispatch(setLoading(true))

  let decks = initialData()

  setTimeout(() => {// Fake loading to make it look like real fetching from api
    dispatch(setState({ loading: false, decks }))

  }, 2000);
}

export const saveDeckTitle =  (dispatch, decks,title,successMsg="New Deck Added Succefully!") => {
  dispatch(setLoading(true))
  const id = generateUID();
  const deck = {
    [id]: {
      id: id,
      title: title,
      questions: []
    }
  }

  dispatch(setState({decks:{...decks,...deck}}))
  ShortToast(successMsg)
  dispatch(setLoading(false))


 
}

export const saveQuestionsToDeck =  (dispatch,decks,deckId, questions,successMsg="Succefully Added New Card") => {
    dispatch(setLoading(true))
    let SelectedDeck = decks?.[deckId]
    let oldQuestions= SelectedDeck?.questions?SelectedDeck?.questions:[]
    let newQuestions = Array.isArray(questions)? [...questions]:[questions] //Convert Object to array

    let updatedDeck= {[deckId]:{...SelectedDeck,questions:[...oldQuestions,...newQuestions]}}
    let updatedDecks = Object.assign(decks,updatedDeck)
    dispatch(setState({decks:updatedDecks}))
    dispatch(setLoading(false))
    ShortToast(successMsg)

}

export const removeDeck =  (dispatch,decks,deckId,successMsg="Deck Removed Succesfully") => {
 
  dispatch(setLoading(true))

  delete decks[deckId]
  dispatch(setState(decks))
  dispatch(setLoading(false))
  ShortToast(successMsg)

  return true


}