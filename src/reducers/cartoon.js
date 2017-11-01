import {
  CREATE_TYPE,
  CREATE_CHAPTER_TYPE,
  GET_BOOK_LIST,
  GET_CHAPTER_DETAIL,
  UPDATE_CHAPTER,
  GET_BOOK_DETAIL,
  GET_CHAPTER_LIST,
  CLEAN_DATA,
  SHOW_TOAST,
  CLEAN_CREATE_CHAPTER,
  CLEAN_CHAPTER_INFO,
  SET_BOOK_DATA,
} from '../const/actionType'

const initState = {
  createBook: {},
  createChapter: {},
  bookList: {},
  chapterInfo: {},
  toast: {
    show: false,
    text: '',
  },
}

export default (state = initState, action) => {
  switch (action.type) {
    case CREATE_TYPE:
      return {
        ...state,
        createBook: action.data,
        toast: action.toast,
        createChapter: {
          result: {},
          success: false,
        },
      }
    case CREATE_CHAPTER_TYPE:
      return {
        ...state,
        createChapter: action.data,
        chapterInfo: {
          result: {},
          success: false,
        },
        bookList: {
          result: {},
          success: false,
        },
        chapterList: {
          result: {},
          success: false,
        },
        toast: action.toast,
      }
    case GET_BOOK_LIST:
      return {
        ...state,
        bookList: action.data,
        toast: action.toast,
        chapterList: {
          result: {},
          success: false,
        },
      }
    case GET_CHAPTER_DETAIL:
      return {
        ...state,
        chapterInfo: action.data,
        toast: action.toast,
      }
    case UPDATE_CHAPTER:
      return {
        ...state,
        updateChapter: action.data,
        chapterInfo: {
          result: {},
          success: false,
        },
        chapterList: {
          result: {},
          success: false,
        },
        toast: action.toast,
      }
    case GET_BOOK_DETAIL:
      return {
        ...state,
        bookDetail: action.data,
        toast: action.toast,
        chapterList: {
          success: false,
          result: {},
        },
      }
    case GET_CHAPTER_LIST:
      return {
        ...state,
        chapterList: action.data,
        modal: action.modal,
      }
    case CLEAN_DATA:
      return {
        ...state,
        updateChapter: {
          result: {},
          success: false,
        },
        createChapter: {
          result: {},
          success: false,
        },
        bookDetail: {
          result: {},
          success: false,
        },
        createBook: {
          result: {},
          success: false,
        },
        chapterDetail: {
          result: {},
          success: false,
        },
        toast: {
          show: false,
          text: '',
        },
      }
    case SHOW_TOAST:
      return {
        ...state,
        toast: action.data,
      }
    case CLEAN_CREATE_CHAPTER:
      return {
        ...state,
        createChapter: {
          result: {},
          success: false,
        },
      }
    case CLEAN_CHAPTER_INFO:
      return {
        ...state,
        chapterInfo: {
          result: {},
          success: false,
        },
      }
    case SET_BOOK_DATA:
      return {
        ...state,
        bookDetail: action.data,
        chapterList: {
          success: false,
          result: {},
        },
      }
    default:
      return state
  }
}
