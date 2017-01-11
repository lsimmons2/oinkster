
import initialState from '../initial-state'


let feedbackReducer = function(feedback = initialState.feedback, action){

  switch(action.type){

    case 'UPDATE_CONTACT':
      return { ...feedback,
        contact: action.input
      }

    case 'UPDATE_FEEDBACK':
      return { ...feedback,
        feedback: action.input
      }

    case 'FEEDBACK_REQUEST':
      return { ...feedback,
        isFetching: true,
        success: false,
        error: false
      }

    case 'FEEDBACK_SUCCESS':
      return { ...feedback,
        isFetching: false,
        success: true,
        error: false,
        contact: '',
        feedback: ''
      }

    case 'FEEDBACK_ERROR':
      return { ...feedback,
        isFetching: false,
        success: false,
        error: true
      }

    default:
      return feedback;
  }

}

export default feedbackReducer
