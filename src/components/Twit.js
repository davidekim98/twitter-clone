import React, {useState} from "react";
import {dbService, storageService} from "myFireBase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

function Twit(props) {
	
	const [Editing, setEditing] = useState(false);
	const [NewTweet, setNewTweet] = useState(props.tweetObj.text)
	
	const onDeleteClick = async () => {
		const ok = window.confirm("Are you sure you want to delete this tweet?");
		if(ok) {
			await dbService.doc(`tweets/${props.tweetObj.id}`).delete();
			await storageService.refFromURL(props.tweetObj.attachmentUrl).delete();
		}
	}
	
	const toggleEditing = () => {
		setEditing((prev) => !prev)
	}
	
	const onChange = (e) => {
		const {
		  target: { value },
		} = e;
		setNewTweet(value);
	}
	
	const onSubmit = async (e) => {
    	e.preventDefault();
		
		await dbService.doc(`tweets/${props.tweetObj.id}`).update({
			text: NewTweet,
		})
		setEditing(false)
	}
	
	return (
		<div className="nweet">
			{
				Editing ?  (
					<>
						{ props.isOwner && (
						<>
							<form onSubmit={onSubmit} className="container nweetEdit">
								<input 
									type="text"
									placeholder="Edit your tweet"
									value={NewTweet}
									onChange={onChange}
									maxLength={120}
									required
									autoFocus
									className="formInput"
								/>
								<input type="submit" value="Update Nweet" className="formBtn" />
							</form>
							<span onClick={toggleEditing} className="formBtn cancelBtn">
								Cancel
          					</span>
						</>
						)}
					</>
				) : (
					<>
						<h4>{props.tweetObj.text}</h4>
						{props.tweetObj.attachmentUrl && <img src={props.tweetObj.attachmentUrl} />}
						{props.isOwner && 
						<div class="nweet__actions">
						  <span onClick={onDeleteClick}>
							<FontAwesomeIcon icon={faTrash} />
						  </span>
						  <span onClick={toggleEditing}>
							<FontAwesomeIcon icon={faPencilAlt} />
						  </span>
						</div>
						}
					</>
				)
			}
		</div>
	)
}

export default Twit