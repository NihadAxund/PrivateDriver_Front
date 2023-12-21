import React, { useEffect, useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, UncontrolledAlert, Alert } from 'reactstrap';
import DropDown from './DropDown';
import { useDispatch, useSelector } from 'react-redux';
import ModalAddFileBtn from './ModalAddFileBtn';
import { getFolderZipAsync } from '../../redux/features/filefolder/fileFolderSlice'
import { getfolderfilesnameAsync, setSharedFolderCode } from '../../redux/features/filefolder/fileFolderSlice';


function getLastPathComponent(fullPath) {
  const pathParts = fullPath.split('/');
  const lastPart = pathParts.pop();
  return lastPart;
}

// const sharedurl = "http://localhost:3000/joinfolder/";
const sharedurl = "https://privatedriver.onrender.com/joinfolder/"

const FolderModal = ({ folder, closeModal, isGuest = false }) => {


  const dispatch = useDispatch();

  const { files, sharedfoldercode } = useSelector((state) => state.fileFolder);
  const [visible, setVisible] = useState(true);

  const onDismiss = () => {
    setVisible(false);
    dispatch(setSharedFolderCode(null));
  };

  const clickdownloadfolderfuncasync = async () => {
    const folderid = folder.id;
    await dispatch(getFolderZipAsync({ folderid }))
  }

  const handleCopy = () => {
    let text = sharedurl + sharedfoldercode;

    // Use Clipboard API if supported
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text)
        .then(() => {
          console.log('Text copied to clipboard:', text);
        })
        .catch((error) => {
          console.error('Error copying text:', error);
        });
    } else {
      // Use an alternative method if Clipboard API is not supported
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();

      try {
        document.execCommand('copy');
        console.log('Text copied to clipboard:', text);
      } catch (error) {
        console.error('Error copying text:', error);
      } finally {
        setTimeout(() => {
          document.body.removeChild(textArea);
        }, 1000);
      }
    }
  };



  useEffect(() => {
    let folderid = folder.id
    const fetchData = async () => {
      try {
        await dispatch(getfolderfilesnameAsync({ folderid }));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (sharedfoldercode) {
      setVisible(true);
    }
  }, [sharedfoldercode])

  if (isGuest) {
    return (
      <Modal style={{ opacity: "85%", maxWidth: "70%", minWidth: "350px" }} isOpen={true}>
        <section className='modalheader'>
          <p className="text-primary">{getLastPathComponent(folder.name)}</p>
          <Button color="primary" outline onClick={clickdownloadfolderfuncasync}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud-download" viewBox="0 0 16 16">
              <path d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z" />
              <path d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708z" />
            </svg>
          </Button>

        </section>
        <div className="black-line"></div>
        <ModalBody style={{ height: "50vh", width: "100%" }}>
          <div className='FolderModalFilesList'>
            {files.map((file, index) => (
              <p key={index}>{file}</p>

            ))}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={closeModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
  else {
    return (
      <Modal style={{ opacity: "85%", maxWidth: "70%", minWidth: "350px" }} isOpen={true}>
        <section className='modalheader'>
          <p className="text-primary">{getLastPathComponent(folder.name)}</p>
          <DropDown closeModal={closeModal} folder={folder} ></DropDown>

        </section>
        <div className="black-line"></div>
        <ModalBody style={{ height: "50vh", width: "100%" }}>
          <div className='FolderModalFilesList'>
            {files.map((file, index) => (
              <p key={index}>{file}</p>

            ))}
          </div>
        </ModalBody>
        <ModalFooter>
          <ModalAddFileBtn folder={folder}></ModalAddFileBtn>
          <Button color="secondary" onClick={closeModal}>
            Close
          </Button>
        </ModalFooter>
        {sharedfoldercode && (
          <Alert className='animate__animated animate__zoomInRight' color="info" style={{ overflow: "hidden", margin: "10px 10px", padding: 0 }} isOpen={visible}>
            <div className='bufferalert'>
              <div className='bufferalert_text'>
                {sharedurl + sharedfoldercode}
              </div>
              <div className='bufferalert_div-1'>
                <Button color="primary" outline onClick={handleCopy}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clipboard-check" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z" />
                    <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z" />
                  </svg>
                </Button>
              </div>
              <div className='bufferalert_div-2'>
                <Button color="danger" outline onClick={onDismiss}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                  </svg>
                </Button>

              </div>
            </div>
          </Alert>

        )}
      </Modal>
    );
  }

};

export default FolderModal;
