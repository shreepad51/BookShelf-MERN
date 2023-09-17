
import {EditOutlined,DeleteOutlined,ImageOutlined,MoreHorizOutlined,} from "@mui/icons-material";
import {Box,Divider,Typography,InputBase,useTheme,Button,IconButton,useMediaQuery,} from "@mui/material";

  import FlexBetween from "components/FlexBetween";
  import UserImage from "components/UserImage";
  import WidgetWrapper from "components/WidgetWrapper";
  import { useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { setPosts } from "state";
  import axios from "axios";
  import BookSearch from "./BookSearch";
  

  
  const NewPost = ({ picturePath}) => {
    const dispatch = useDispatch();
    const [isImage, setIsImage] = useState(false);
    //-----------------------------------------------------------------
   //const [thumb,setChaya] = useState();
   console.log('Post');
   //console.log(thumb);
    //------------------------------------------------------------------
  // actual post contents
    const [image, setImage] = useState(null);
    const [post, setPost] = useState("");
    //console.log('Post');
    
    const { palette } = useTheme();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;
  
  
    async function handlePost () {
        console.log("Handle post triggered")
        //console.log(imgpath);
      const formData = new FormData(); //for passing image
      formData.append("userId", _id);
      formData.append("description", post);

      formData.append("picturePath", 'pathtoBooks');
      const response = await fetch(`http://localhost:3001/posts`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
  
      const posts = await response.json();
      dispatch(setPosts({ posts })); //list of posts
      setImage(null);
      setPost("");
    };
    
  
    return (
      <WidgetWrapper>
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <BookSearch/>
          <InputBase
            placeholder="What's on your mind..."
            onChange={(e) => setPost(e.target.value)}
            value={post}
            
            sx={{
              width: "90%",
              backgroundColor: palette.neutral.light,
              borderRadius: "2rem",
              padding: "1rem 2rem",
            }}
          />
        </FlexBetween>
        {isImage && (
          <Box
            border={`1px solid ${medium}`}
            borderRadius="5px"
            mt="1rem"
            p="1rem"
          >
              {({ getRootProps, getInputProps }) => (
                <FlexBetween>
                  <Box
                    {...getRootProps()}
                    border={`2px dashed ${palette.primary.main}`}
                    p="1rem"
                    width="100%"
                    sx={{ "&:hover": { cursor: "pointer" } }}
                  >
                    <input {...getInputProps()} />
                    {!image ? (
                      <p>Add Image Here</p>
                    ) : (
                      <FlexBetween>
                        <Typography>{image.name}</Typography>
                        <EditOutlined />
                      </FlexBetween>
                    )}
                  </Box>
                  {image && (
                    <IconButton
                      onClick={() => setImage(null)}
                      sx={{ width: "15%" }}
                    >
                      <DeleteOutlined />
                    </IconButton>
                  )}
                </FlexBetween>
              )}
          </Box>
        )}
  
        <Divider sx={{ margin: "1.25rem 0" }} />
  
        <FlexBetween>
          <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
            <ImageOutlined sx={{ color: mediumMain }} />
            <Typography
              color={mediumMain}
              sx={{ "&:hover": { cursor: "pointer", color: medium } }}
            >
              Image
            </Typography>
          </FlexBetween>
  
          {isNonMobileScreens ? (
            <>
            </>
          ) : (
            <FlexBetween gap="0.25rem">
              <MoreHorizOutlined sx={{ color: mediumMain }} />
            </FlexBetween>
          )}
  
          <Button
            disabled={!post}
            onClick={handlePost}
            sx={{
              color: palette.background.alt,
              backgroundColor: palette.primary.main,
              borderRadius: "3rem",
            }}
            
          >
            POST
            
          </Button>
        </FlexBetween>
      </WidgetWrapper>
    );
  };


export default NewPost;



//export default Main;