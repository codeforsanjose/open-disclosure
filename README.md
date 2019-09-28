# open-disclosure
Opening up political campaign finances in San Jose


### How to Contribute
```
git clone https://github.com/ErikaVasNormandy/open-disclosure.git
Cloning into 'open-disclosure'...
remote: Enumerating objects: 3, done.
remote: Counting objects: 100% (3/3), done.
remote: Compressing objects: 100% (2/2), done.
remote: Total 3 (delta 0), reused 0 (delta 0), pack-reused 0
Unpacking objects: 100% (3/3), done.

cd open-disclosure/


ls
README.md


git status
On branch master
Your branch is up to date with 'origin/master'.

nothing to commit, working tree clean


git remote -v
origin  https://github.com/ErikaVasNormandy/open-disclosure.git (fetch)
origin  https://github.com/ErikaVasNormandy/open-disclosure.git (push)


git remote add upstream https://github.com/codeforsanjose/open-disclosure.git


git remote -v
origin  https://github.com/ErikaVasNormandy/open-disclosure.git (fetch)
origin  https://github.com/ErikaVasNormandy/open-disclosure.git (push)
upstream        https://github.com/codeforsanjose/open-disclosure.git (fetch)
upstream        https://github.com/codeforsanjose/open-disclosure.git (push)

git fetch -a

git pull upstream master
From https://github.com/codeforsanjose/open-disclosure
 * branch            master     -> FETCH_HEAD
 * [new branch]      master     -> upstream/master
Already up to date.


```