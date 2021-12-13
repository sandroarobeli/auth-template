import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


export const signup = createAsyncThunk(
    'user/signup',
    // rejectWithValue ENABLES CUSTOM ERROR MESSAGING
    async (initialUser, { rejectWithValue }) => {
        try {
            const response = await fetch(
                'http://127.0.0.1:5000/api/user/signup',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        //'Authorization': 'Bearer ' + token
                      },
                    mode: 'cors',
                    body: JSON.stringify({
                        userName: initialUser.userName,
                        email: initialUser.email,
                        password: initialUser.password
                    })     
                }
            )
            const responseData = await response.json()
            if (!response.ok) {
                // NON-NETWORK (NON 500 STATUS CODE) RELATED ERRORS
                return rejectWithValue(responseData.message)
            }
            return responseData.user
        } catch (error) {
            // NETWORK RELATED ERRORS
            console.log('from thunk catch')//test
            console.log(error.message)//test
            return rejectWithValue(error.message)
        }
    }
)


export const login = createAsyncThunk(
    'user/login',
    // rejectWithValue ENABLES CUSTOM ERROR MESSAGING
    async (initialUser, { rejectWithValue }) => {
        try {
            const response = await fetch(
                'http://127.0.0.1:5000/api/user/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    mode: 'cors',
                    body: JSON.stringify({
                        email: initialUser.email,
                        password: initialUser.password
                    })
                }
            )
            const responseData = await response.json()
            if (!response.ok) {
                // NON-NETWORK (NON 500 STATUS CODE) RELATED ERRORS
                return rejectWithValue(responseData.message)
            }
          
            return responseData.user
         
        } catch (error) {
            // NETWORK RELATED ERRORS
            console.log('from thunk catch')//test
            console.log(error.message)//test
            return rejectWithValue(error.message)
        }
    }
)
 



const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {
            userName: "",
            email: "",
            userId: "",
            token: ""
        },
        status: 'idle',
        error: null
    },
    reducers: {
        // Restores logged in status upon page reload
        autoLogin: (state, action) => {
            state.user.userName = action.payload.userName
            state.user.email = action.payload.email
            state.user.userId = action.payload.userId
            state.user.token = action.payload.token
        },
        logout: (state, action) => {
            state.user.userName = ""
            state.user.email = ""
            state.user.userId = ""
            state.user.token = ""
            localStorage.removeItem('userData')
        },
        // Sets state.status to 'idle' again so login button becomes clickable again
        clearError: (state, action) => {
            state.error = ""
            state.status = 'idle'
        }
    },
    extraReducers(builder) {
        builder
            .addCase(signup.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.status = 'succeeded'
                console.log('final payload')// test
                console.log(action.payload)// test
                state.user.userName = action.payload.userName
                state.user.email = action.payload.email
                state.user.userId = action.payload.userId
                state.user.token = action.payload.token
                localStorage.setItem('userData', JSON.stringify({ userName: action.payload.userName, userId: action.payload.userId, email: action.payload.email, token: action.payload.token }))
            })
            .addCase(signup.rejected, (state, action) => {
                state.status = 'failed'
                console.log('action.payload')//test
                console.log(action.payload)//test  ALLOWS CUSTOM MESSAGING
                console.log('action.error')//test
                console.log(action.error.message)// test ALLOWS PRE SET STANDARD MESSAGING 
                state.error = action.payload // CUSTOM
                //state.error = action.error.message// STANDARD-PRESET
            })
            .addCase(login.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded'
                console.log('final payload')// test
                console.log(action.payload)// test
                state.user.userName = action.payload.userName
                state.user.email = action.payload.email
                state.user.userId = action.payload.userId
                state.user.token = action.payload.token
                localStorage.setItem('userData', JSON.stringify({ userName: action.payload.userName, userId: action.payload.userId, email: action.payload.email, token: action.payload.token }))
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed'
                console.log('action.payload')//test
                console.log(action.payload)//test  ALLOWS CUSTOM MESSAGING
                console.log('action.error')//test
                console.log(action.error.message)// test ALLOWS PRE SET STANDARD MESSAGING 
                state.error = action.payload // CUSTOM
                //state.error = action.error.message// STANDARD-PRESET
            })
    }
})

// Exports reducer functions
export const { autoLogin, logout, clearError } = userSlice.actions

// Exports all posts as an array
export const selectUsername = (state) => state.user.user.userName;
export const selectUserId = (state) => state.user.user.userId
export const selectToken = (state) => state.user.user.token
export const selectStatus = (state) => state.user.status
export const selectError = (state) => state.user.error

export default userSlice.reducer