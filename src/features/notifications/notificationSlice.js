import { createSlice } from '@reduxjs/toolkit';

//AWS Amplify GraphQL libraries
import { API } from 'aws-amplify';
import { updateNotification as updateNotificationMutation } from '../../graphql/mutations';

export const notificationSlice = createSlice({
  name: 'notification',
  initialState: [
    {id: "",
    fromUserId: "",
    toUserId: "",
    title: "",
    message: "",
    action: "",
    status: "",
    }
  ],
  reducers: {
    updateNotification: (state, action) => {
      //console.log('updateNotification: action', action)
      //console.log('updateNotification: state',state)
      state.id = action.payload.id
      state.fromUserId = action.payload.fromUserId
      state.toUserId = action.payload.toUserId
      state.title = action.payload.title
      state.message = action.payload.message
      state.action = action.payload.action
      state.status = action.payload.status
    },
  },
});

export const { updateNotificationStatus, updateNotification } = notificationSlice.actions;

// The function below is called a thunk and allows us to pernotification async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const updateNotificationAsync = notification => dispatch => {
  console.log('updateNotificationAsync: notification', notification)
  API.graphql({ 
      query: updateNotificationMutation, 
      variables: { 
        input: {
          id: notification.id, 
          fromUserId: notification.fromUserId,
          toUserId: notification.toUserId,
          title: notification.title,
          message: notification.message,
          action: notification.action,
          status: notification.status,
        }
      } 
  })    
  dispatch(updateNotification(notification));
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectNotification = state => state.notification;

export default notificationSlice.reducer;