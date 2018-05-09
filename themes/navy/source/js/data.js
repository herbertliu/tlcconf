(function() {
    'use strict';

    axios
        .get('//now.qq.com/cgi-bin/now/activity_cms/form_data?actid=50413883')
        .then(function (response) {
            var data = response.data && response.data.result;
            var url = location.href;

            if (data) {
                if (/speakers/.test(url)) {
                    renderSpeakerPage(data);
                } else if (/subjects/.test(url)) {
                    renderSubjectPage(data);
                } else if (/schedules/.test(url)) {
                    renderSchedulePage(data);
                } else {
                    renderIndexPage(data);
                }
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

    var renderIndexPage = function(data) {
        renderFeature(data.featureInfo);
        renderSubject(data.subjectInfo);
        renderSpeaker(data.speakerInfo);
        renderPartner(data.sponsorInfo);
        renderFriendLink(data.friendlinkInfo);
    };

    var renderSpeakerPage = function(data) {

        var initialTabContent = function() {
            renderTabContent(getAllSpeakers());
        };

        var getAllSpeakers = function() {
            var speakerItems = [];
            for (var i = 0; i < items.length; i ++) { 
                speakerItems = speakerItems.concat(items[i].speakers);
            }
            return speakerItems;
        };

        var renderTabContent = function(speakerItems) {
            var tabContentTpl = '{% for item in speakerItems %}  <li class="intro-user-item"> <img src="{{item.avatar}}"> <div class="intro-user-info"> <p class="name">{{item.name}}</p> <p class="desc">{{item.intro}}</p> </div> </li>  {% endfor %}'
            var tabContentOutput = swig.render(tabContentTpl, {
                locals: {
                    speakerItems: speakerItems
                }
            });
            
            $('#intro-user-wrap').html(tabContentOutput);
        };

        var items = data.subjectInfo.items;

        var headItems = ['全部'];
        
        for (var i = 0; i < items.length; i ++) {
            headItems.push(items[i].title);
        }

        var tabHeadTpl = '{% for item in headItems %}  <li>{{ item }}</li>  {% endfor %}'
        var tabHeadOutput = swig.render(tabHeadTpl, {
            filename: '/tabHeadTpl',
            locals: {
                headItems: headItems
            }
        });
        
        $('#tab-head-items').html(tabHeadOutput);
        initialTabContent();
        
        $('#tab-head-items li').click(function() {
            var index = $(this).index();

            var speakerItems = [];

            if (index) {
                speakerItems = items[index].speakers;
            } else {
                speakerItems = getAllSpeakers();
            }

            renderTabContent(speakerItems);
        });
        
    };

    var renderSubjectPage = function(data) {
        var subjectTpl = '{% for item in subjectItems %}<div id="speaker-subject-wrap"> <div class="speaker-subject-title"></div> <div class="{% if item.isMain %} speaker-subject-main {% else %} speaker-subject-branch {% endif %}"> <p class="speaker-subject-main-title">{{item.title}}</p> <p class="speaker-subject-main-content">{{item.description}}</p> </div> <ul> {% for speakerItem in item.speakers %}<li class="speaker-subject-items"> <div class="speaker-avatar"><img src="{{speakerItem.avatar}}" /></div> <div class="speaker-info"> <p class="speaker-topic">{{speakerItem.topic}}</p> <p class="speaker-name">{{speakerItem.name}}</p> </div> </li>{% endfor %}</ul> </div> {% endfor %}';

        var subjectOutput = swig.render(subjectTpl, {
            filename: '/subjectTpl',
            locals: {
                subjectItems: data.subjectInfo.items
            }
        });
        
        $('#subject-wrap').html(subjectOutput);
    };

    var renderSchedulePage = function(data) {

        var initialTabContent = function() {
            renderTabContent('全部', getAllSchedules());
        };

        var getAllSchedules = function() {
            var schedulesItems = [];
            for (var i = 0; i < items.length; i ++) { 
                schedulesItems = schedulesItems.concat(items[i].schedules);
            }
            return schedulesItems;
        };

        var renderTabContent = function(title, schedulesItems) {
            var tabContentTpl = '<h1> <i></i> {{title}}</h1> <ul> {% for item in schedulesItems %}<li> <div class="time-slot"> {{item.timeline}}<span class="border"></span> <span class="dot"></span> </div> <div class="plan">{{item.plan}}</div> </li>{% endfor %}</ul>'
            var tabContentOutput = swig.render(tabContentTpl, {
                locals: {
                    title: title,
                    schedulesItems: schedulesItems
                }
            });
            
            $('#timeline-wrap').html(tabContentOutput);
        };

        var items = data.subjectInfo.items;

        var headItems = ['全部'];
        
        for (var i = 0; i < items.length; i ++) {
            headItems.push(items[i].title);
        }

        var tabHeadTpl = '{% for item in headItems %}  <li>{{ item }}</li>  {% endfor %}'
        var tabHeadOutput = swig.render(tabHeadTpl, {
            filename: '/tabHeadTpl',
            locals: {
                headItems: headItems
            }
        });
        
        $('#tab-head-items').html(tabHeadOutput);
        initialTabContent();
        
        $('#tab-head-items li').click(function() {
            var index = $(this).index();
            var text = $(this).text();

            var schedulesItems = [];

            if (index) {
                schedulesItems = items[index].schedules;
            } else {
                speakerItems = getAllSchedules();
            }

            renderTabContent(text, schedulesItems);
        });
        
    };
  }());  