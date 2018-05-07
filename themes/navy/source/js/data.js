(function() {
    'use strict';

    axios
        .get('//now.qq.com/cgi-bin/now/activity_cms/form_data?actid=50413883')
        .then(function (response) {
            var data = response.data && response.data.result;

            if (data) {
                renderFeature(data.featureInfo);
                renderSubject(data.subjectInfo);
                renderSpeaker(data.speakerInfo);
                renderPartner(data.sponsorInfo);
                renderFriendLink(data.friendlinkInfo);
            }
        })
        .catch(function (error) {
            console.log(error);
        });

    var renderFeature = function(featureInfo) {

        var tpl = '{% for item in items %} <li class="intro-feature-wrap"><div class="intro-feature"><div class="intro-feature-icon"><img src="{{ item.icon }}" class="image"></div><h3 class="intro-feature-title">{{ item.title }}</h3><p class="intro-feature-desc">{{ item.description }}</p></div></li> {% endfor %}'
        var featureOutput = swig.render(tpl, {
            filename: '/tpl',
            locals: {
                items: featureInfo.items
            }
        });

        document.getElementById('intro-feature-list').innerHTML = featureOutput;
    };
    
    var renderSubject = function(subjectInfo) {

        var subjectTpl = '<div class="subject-title"></div> <div class="subject-main"> <p class="subject-main-title">{{ subjectMainInfo.title }}</p> <p class="subject-main-content">{{ subjectMainInfo.description }}</p> </div> <ul> {% for item in branchItems %}<li class="subject-branch"> <p class="subject-branch-title">{{ item.title }}</p> <p class="subject-branch-content">{{ item.description }}</p> </li>{% endfor %}</ul>'
        var subjectOutput = swig.render(subjectTpl, {
            filename: '/subjectTpl',
            locals: {
                subjectMainInfo: subjectInfo.subjectMainInfo,
                branchItems: subjectInfo.subjectBranchInfo.rules
            }
        });

        document.getElementById('subject-wrap').innerHTML = subjectOutput;
    };

    var renderSpeaker = function(speakerInfo) {
        var speakerTpl = '{% for item in speakerItems %}  <li class="intro-user-item"> <img src="{{ item.avatar }}"> <div class="intro-user-info"> <p class="name">{{ item.name }}</p> <p class="desc">{{ item.description }}</p> </div> </li>  {% endfor %}'
        var speakerOutput = swig.render(speakerTpl, {
            filename: '/speakerTpl',
            locals: {
                speakerItems: speakerInfo.items
            }
        });

        document.getElementById('speaker-items').innerHTML = speakerOutput;
    };

    var renderPartner = function(sponsorInfo) {
        var sponsorTpl = '{% for item in sponsorItems %}  <li class="partner-item"><img src="{{ item.logo }}"></li>  {% endfor %}'
        var sponsorOutput = swig.render(sponsorTpl, {
            filename: '/sponsorTpl',
            locals: {
                sponsorItems: sponsorInfo.items
            }
        });

        document.getElementById('sponsor-items').innerHTML = sponsorOutput;
    };

    var renderFriendLink = function(friendlinkInfo) {
        var friendLinkOutputTpl = '{% for item in friendlinkItems %}  <li><a href="{{ item.link }}" target="_blank">{{ item.text }}</a></li>  {% endfor %}'
        var friendLinkOutput = swig.render(friendLinkOutputTpl, {
            filename: '/friendLinkOutputTpl',
            locals: {
                friendlinkItems: friendlinkInfo.rules
            }
        });

        document.getElementById('friendlink-items').innerHTML = friendLinkOutput;
    };
  }());  