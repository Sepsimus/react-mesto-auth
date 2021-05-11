import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import ImagePopup from './ImagePopup';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import api from '../utils/api';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ProtectedRoute from './ProtectedRoute';

function App() {

  const [loggedIn, setLoggedIn] = React.useState(false);
  const[currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  function handleCardLike(card){
    const isLiked = card.likes.some(user => user._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
    .then((newCard) => {
      setCards((state) => 
      state.map(
        (c) => c._id === card._id ? newCard : c)
      );
  });
  } 

  function handleCardDelete(card){
  api.deleteCard(card._id)
  .then(() => {
    setCards((cards.filter(item => item._id !== card._id)))
  })
  }

  React.useEffect(() => {
    Promise.all([api.userServerInfo(), api.getInitialCards()])
    .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
    })
    .catch((err) => {
        console.log(`Ошибка:${err}. Запрос не выполнен`);
    })
  }, []);

  const [selectedCard, setSelectedCard] = React.useState(null);
  function handleCardClick(cardData){
    setSelectedCard(cardData);
  }

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  function handleEditAvatarClick(){
    setIsEditAvatarPopupOpen(true);
  }

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  function handleEditProfileClick(){
    setIsEditProfilePopupOpen(true);
  }
  
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  function handleAddPlaceClick(){
    setIsAddPlacePopupOpen(true);
  }

  const[isDeleteConfirmPopupOpen, setIsDeleteConfirmPopupOpen] = React.useState(false);
  function handleDeleteCardClick(){
    setIsDeleteConfirmPopupOpen(true);
  }

  function closeAllPopups(){
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteConfirmPopupOpen(false);
    setSelectedCard(null);
  };

  function handleUpdateUser(newUserInfo){
    api.editProfile(JSON.stringify(newUserInfo))
    .then((userData) => {
      setCurrentUser(userData);
      closeAllPopups();
    })
    .catch((err) => {
        console.log(`Ошибка:${err}. Запрос не выполнен`);
    })
  }

  function handleUpdateAvatar(newAvatarInfo){
    api.editAvatar(JSON.stringify(newAvatarInfo))
      .then((userData) => {
          setCurrentUser(userData);
          closeAllPopups();
      })
      .catch((err) => {
          console.log(`Ошибка:${err}. Запрос не выполнен`);
      })
  }

  function handleUpdateCards(newCardInfo){
    api.addCard(JSON.stringify(newCardInfo))
    .then((cardsData) => {
      setCards([cardsData, ...cards])
      closeAllPopups();
    })
    .catch((err) => {
        console.log(`Ошибка:${err}. Запрос не выполнен`);
    })
  }

  return (
    <CurrentUserContext.Provider value = {currentUser}>
    <div className="substrate">
      <div className="page">
        <Header />

        <Switch>
            <ProtectedRoute 
            path="/main"
            loggedIn={loggedIn}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onDeleteCardClick={handleDeleteCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            component={Main}/>
            
          <Route path="/sign-up">
            {//<Sign-up />
}
          </Route>

          <Route path="/sign-in">
  {//          <Sign-in />
}
          </Route>

          <Route exact path="/">
            {loggedIn ? <Redirect to="/main" /> : <Redirect to="sign-in" />}
          </Route>

        </Switch>
        <Footer />

        <ImagePopup
        onClose={closeAllPopups}
        card={selectedCard}
        />

        <EditAvatarPopup 
        onClose={closeAllPopups}
        isOpen={isEditAvatarPopupOpen}
        onUpdateAvatar={handleUpdateAvatar} 
        />
       
      <EditProfilePopup 
        onClose={closeAllPopups} 
        isOpen={isEditProfilePopupOpen}
        onUpdateUser={handleUpdateUser} 
        />

      <AddPlacePopup 
      onClose={closeAllPopups}
      isOpen={isAddPlacePopupOpen}
      onUpdatePlace={handleUpdateCards}
      />

       <PopupWithForm 
       onClose={closeAllPopups}
       name='deleteConfirm'
       title='Вы уверенны?'
       isOpen={isDeleteConfirmPopupOpen}
       children={
        <button className="popup__save" type="submit">Да</button>
       }
       />
       
      </div>
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
