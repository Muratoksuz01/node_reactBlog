import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from "../helper/AuthContex";
function Post() {
  let { id } = useParams()
  const [postObject, setPostObject] = useState({})
  const [comments, setComments] = useState([])  // Başlangıç değerini boş dizi yapın
  const [Newcomment, setNewComment] = useState("")  // Başlangıç değerini boş dizi yapın
  const { authState} =useContext(AuthContext )
  useEffect(() => {
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
      setPostObject(response.data)
    });

    axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
      setComments(response.data)
    });
  }, [id])
  const addComment = () => {
    axios.post("http://localhost:3001/comments", {
      commentBody: Newcomment,
      PostId: id
    },
      {
        headers: { accessToken: localStorage.getItem("accessToken") }
      }).then((response) => {
        if(response.data.error){
          alert(response.data.error)
        }else{

          const CommentToAdd = { commentBody: Newcomment,username:response.data.username }
          setComments([...comments, CommentToAdd])
          setNewComment("")
        }

      })
  }

  const deleteComment=(id)=>{
    axios.delete(`http://localhost:3001/comments/${id}`,
    {headers:{accessToken:localStorage.getItem("accessToken")}})
    .then((res)=>{
      console.log("clien taraf :",res)
      setComments(
        comments.filter((val)=>{
          return val.id !=id
        })
      )
    })
  }
  return (
    <div className='postPage'>
      <div className="leftSide">
        <div className="post" id="individual">
          <div className="title"> {postObject.title}</div>
          <div className="body"> {postObject.postText}</div>
          <div className="footer"> {postObject.username}</div>
        </div>
      </div>
      <div className="rightSide">
        <div className='addCommentContainer'>
          <input type="text" placeholder='Comment...' value={Newcomment} onChange={(event) => { setNewComment(event.target.value) }} />
          <button type="submit" onClick={addComment}>Add comment</button>
        </div>
        <div className="listOfComments">
          {comments.map((comment, key) => {
            return(
              
              <div key={key} className="comment">{comment.commentBody}
              
              <label > username: {comment.username}</label>
              {authState.username===comment.username && <button onClick={()=>deleteComment(comment.id)}>DELETE</button>}
              </div>

            ) 
          })}
        </div>
      </div>
    </div>
  )
}

export default Post