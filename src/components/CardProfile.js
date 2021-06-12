import React, { useState } from 'react';
import './CardProfile.css';

const ImgUpload = ({ onChange, src }) => (
  <label htmlFor='photo-upload' className='custom-file-upload fas'>
    <div className='img-wrap img-upload'>
      <img for='photo-upload' src={src} />
    </div>
    <input id='photo-upload' type='file' onChange={onChange} />
  </label>
);

const FirstName = ({ onChange, value, t }) => (
  <div className='field'>
    <label htmlFor='firstname'>{t('yourAccount_FirstName')}</label>
    <input
      id='firstname'
      type='text'
      onChange={onChange}
      maxlength='25'
      value={value}
      placeholder='Alexa'
      required
    />
  </div>
);

const LastName = ({ onChange, value, t }) => (
  <div className='field'>
    <label htmlFor='firstname'>{t('yourAccount_LastName')}</label>
    <input
      id='firstname'
      type='text'
      onChange={onChange}
      maxlength='25'
      value={value}
      placeholder='Alexa'
      required
    />
  </div>
);

const Email = ({ onChange, value, t }) => (
  <div className='field'>
    <label htmlFor='email'>{t('yourAccount_Email')}</label>
    <input
      id='email'
      type='text'
      onChange={onChange}
      maxlength='25'
      value={value}
      placeholder='Alexa'
      required
    />
  </div>
);

const Username = ({ onChange, value, t }) => (
  <div className='field'>
    <label htmlFor='username'>{t('yourAccount_Username')}</label>
    <input
      id='username'
      type='text'
      onChange={onChange}
      maxlength='25'
      value={value}
      placeholder='Alexa'
      required
    />
  </div>
);

// const Status = ({ onChange, value }) => (
//   <div className='field'>
//     <label htmlFor='status'>status:</label>
//     <input
//       id='status'
//       type='text'
//       onChange={onChange}
//       maxLength='35'
//       value={value}
//       placeholder="It's a nice day!"
//       required
//     />
//   </div>
// );

const Profile = ({ onSubmit, src, firstname, lastname, username, email,t  }) => (
  <div className='card'>
    <form onSubmit={onSubmit}>
      <h1>{t('yourAccount')}</h1>
      <label className='custom-file-upload fas'>
        <div className='img-wrap'>
          <img for='photo-upload' src={src} />
        </div>
      </label>
      <div className='name'>{firstname}</div>
      <div className='name'>{lastname}</div>
      <div className='name'>{username}</div>
      <div className='name'>{email}</div>
      <button type='submit' className='edit'>
        {t('yourAccount_editProfile')}
      </button>
    </form>
  </div>
);

const Edit = ({ onSubmit, children, t }) => (
  <div className='card'>
    <form onSubmit={onSubmit}>
      <h1>{t('yourAccount')}</h1>
      {children}
      <button type='submit' className='save'>
        Save
      </button>
    </form>
  </div>
);

class CardProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { t: props.t };
  }

  state = {
    file: '',
    imagePreviewUrl:
      'https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true',
    name: '',
    status: '',
    active: 'edit',
    t: 0,
  };

  photoUpload = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };
  editFirstName = (e) => {
    const firstname = e.target.value;
    this.setState({
      firstname,
    });
  };

  editLastName = (e) => {
    const lastname = e.target.value;
    this.setState({
      lastname,
    });
  };

  editEmail = (e) => {
    const email = e.target.value;
    this.setState({
      email,
    });
  };

  editUserName = (e) => {
    const username = e.target.value;
    this.setState({
      username,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let activeP = this.state.active === 'edit' ? 'profile' : 'edit';
    this.setState({
      active: activeP,
    });
  };

  render() {
    const { imagePreviewUrl, firstname, lastname, email, username, active, t } =
      this.state;
    return (
      <div>
        {active === 'edit' ? (
          <Edit onSubmit={this.handleSubmit} t={t}>
            <ImgUpload onChange={this.photoUpload} src={imagePreviewUrl} />
            <FirstName onChange={this.editFirstName} value={firstname} t={t} />
            <LastName onChange={this.editLastName} value={lastname} t={t}/>
            <Email onChange={this.editEmail} value={email} t={t}/>
            <Username onChange={this.editUserName} value={username} t={t}/>
          </Edit>
        ) : (
          <Profile
            onSubmit={this.handleSubmit}
            src={imagePreviewUrl}
            firstname={firstname}
            lastname={lastname}
            email={email}
            username={username}
            t={t}
          />
        )}
      </div>
    );
  }
}

export default CardProfile;
