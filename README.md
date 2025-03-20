# Powerhour Creator

This project was made with React, using Typescript & MySQL.

## ToDo

- [x] YouTube video player
- [x] YouTube Search
- [x] Creation of Playlists
- [x] Saving playlists to database
- [x] Local storage for playlist
- [x] User sign in
- [ ] Create vs. Edit Playlist
- [ ] Set current time for playing video
- [ ] Like system for playlists
- [ ] Comments for playlists
- [ ] Filtering system for names / comments
- [ ] Playcount on playlists
- [ ] View/search for Playlists
- [ ] Playlist ratings

## MySQL Table Commands

# Playlist
'''
CREATE TABLE powerhour.Playlist (
id int NOT NULL AUTO_INCREMENT,
Name varchar(100) NOT NULL,
UserID int,
PRIMARY KEY (id),
CONSTRAINT FK_UserID FOREIGN KEY (UserID)
REFERENCES powerhour.Users(id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;
'''

# Videos
'''
CREATE TABLE powerhour.Videos (
id varchar(100) NOT NULL,
Name varchar(100) NOT NULL,
Url varchar(255) NOT NULL,
PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;

'''

# Playlist_Videos
'''
CREATE TABLE powerhour.Playlist_Videos (
id int NOT NULL AUTO_INCREMENT,
VideoID varchar(100) NOT NULL,
PlaylistID int NOT NULL,
PRIMARY KEY (id),
CONSTRAINT FK_PlaylistID FOREIGN KEY (PlaylistID)
REFERENCES powerhour.Playlists(id),
CONSTRAINT FK_VideoID FOREIGN KEY (VideoID)
REFERENCES powerhour.Videos(id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;
'''

# User_Bookmarked
'''
CREATE TABLE powerhour.User_Bookmarked (
id int NOT NULL AUTO_INCREMENT,
UserID int NOT NULL,
PlaylistID int NOT NULL,
PRIMARY KEY (id),
CONSTRAINT FK_UserBookmarked_PlaylistID FOREIGN KEY (PlaylistID)
REFERENCES powerhour.Playlists(id),
CONSTRAINT FK_UserBookmarked_UserID FOREIGN KEY (UserID)
REFERENCES powerhour.Users(id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;
'''

# Playlist_Likes
'''
CREATE TABLE powerhour.Playlist_Likes (
id int NOT NULL AUTO_INCREMENT,
UserID int NOT NULL,
PlaylistID int NOT NULL,
PRIMARY KEY (id),
CONSTRAINT FK_PlaylistLikes_PlaylistID FOREIGN KEY (PlaylistID)
REFERENCES powerhour.Playlists(id),
CONSTRAINT FK_PlaylistLikes_UserID FOREIGN KEY (UserID)
REFERENCES powerhour.Users(id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;
'''

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
