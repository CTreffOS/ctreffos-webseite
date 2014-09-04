#!/usr/bin/env bash
#
# Cloning CTreffOS Github repository and upload via ftp to CTreffOS website.
#

version="Dr. Peter Voigt - v1.0.0 / 2014-09-04"
ctreffosGithubRepo="https://github.com/CTreffOS/ctreffos-webseite.git"
# Adapt the following variables to your need.
ftpHost=spock.drpetervoigt.private
ftpPort=50100
ftpTargetDir=pub/upload/test
ftpUser=tester
# Insert ftpPasswd into the following file:
ftpPasswdFile=/home/pvoigt/.ctreffos-webseite.passwd
tmpDir=/tmp
githubTmpDir=$tmpDir/ctreffos-webseite

function printVersion
{
  echo "`basename $0` - $version"
  echo "INFO: Cloning CTreffOS Github repository and upload via ftp to ctreffos website."
}


function getFtpPasswd
{
  echo "INFO: Reading ftp password from file $ftpPasswdFile"
  read ftpPasswd < $ftpPasswdFile
}

function cloneCtreffosGithubrepo
{
  echo "INFO: Cloning CTreffOS Github repository $ctreffosGithubRepo."
  cd $tmpDir
  git clone $ctreffosGithubRepo
}

function uploadToCtreffosWebsite
{  
  echo "INFO: Uploading to CTreffOS website."
  lftp -d <<END_OF_SESSION
  set ftp:ssl-allow false
  set ssl:verify-certificate true
  set ftp:ssl-protect-data true
  set ftp:ssl-protect-list true
  set ssl:ca-file /usr/local/etc/certs/pvoigt-ca-bundle.crt
  set ftp:passive-mode on
  set ftp:fix-pasv-address true
  open -p $ftpPort -u $ftpUser,$ftpPasswd $ftpHost
  pwd
  cd $ftpTargetDir
  lcd $githubTmpDir
  mrm *
  mput *
  close
  quit
END_OF_SESSION
}

function removeTmpDir
{
  if [ -d $githubTmpDir ] ; then
    echo "INFO: Removing $githubTmpDir."
    rm -rf $githubTmpDir
  fi
}

printVersion
cloneCtreffosGithubrepo
getFtpPasswd
uploadToCtreffosWebsite
removeTmpDir

