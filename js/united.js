///////////////////////////////////////////////////////////////////////////////////////
//
// Обучающее видео компании Cryo-Cell International
// http://cryo-cell.com
//
// Разработчик RBA DESIGN INTERNATIONAL LLC
// http://rbadesign.us
//
// Версия для iPad и Web
//
////////////////////////////////////////////////////////////////////////////////////////

// YouTube JavaScript Player API  
var onYouTubePlayerReady;
var onStateChange;
var onError;

// Событие инициализации YouTube Player API
var onYouTubePlayerAPIReady;
var onPlayerError;
var onPlayerReady;
var onPlayerStateChange;

(function ($) {
	// Определение способа воспроизведения видео с YouTube
	// Значения:
	//     tubeplayer   - использование плагина Tubeplayer (http://www.tikku.com/jquery-youtube-tubeplayer-plugin)
	//     iframeplayer - использование YouTube Player API (https://developers.google.com/youtube/iframe_api_reference)
	//     jsplayer     - использование YouTube JavaScript Player API (https://developers.google.com/youtube/js_api_reference)
	var PlayerApi = "tubeplayer";
	
	// Используется для YouTube Player API
	var YtPlayers = {};
	
	var deviceReadyDeferred = $.Deferred();
	var domReadyDeferred = $.Deferred();
	var languageReadyDeferred = $.Deferred();
	var iframePlayerAPIReadyDeferred = $.Deferred();
	var playerReadyDeferred = {};
	var playerActivated = {};
	
	var currentIndex = 0;
	var currentLanguage = "en";
	var showSurvey = false;
	var showRules = false;
	var url = false;
	
	// Дефолтные значения передаваемых аргументов
	// Аргументы передаются в виде строки адреса,
	// либо задаются в параметре iPadID
	// в формате имя1=значение1&имя2=значение2&имя3=значение3&...
	// Переданные в скрипт аргументы используются в шаблонах заголовков страниц
	// и в качестве дефолтных значений полей форм ввода.
	// Примечание - строка должна быть urlencoded
	// Пример: 
	//    WWW    http://sweepstakes.com?doctor=Doctor%20No
	//    iPad   doctor=Doctor%20No
	// Arguments are sent as browser's address
	// or as value of iPadID
	// with format name1=value1&name2=value2&name3=value3&...
	// Send arguments to script will apply to page header templates
	// or as default values of input fields of forms.
	// NB - string must be urlencoded
	// Examples:
	//    WWW    http://sweepstakes.com?doctor=Doctor%20No
	//    iPad   doctor=Doctor%20No
	var args = {
		doctor: "Cryo-Cell"
	};
	
	// Определение воспроизводимого видео
	// Задаётся видео ID на YouTube и массив видео-файлов
	// В дальнейшем в зависимости от способа воспроизведения видео
	// будет воспроизводится либо видео с YouTube, либо из видео-файла
	var videos = {
		en: {
			video1: { 
				videoId: "uuqGzMd808c",
				sources: [ 
					{ src:"video/CC_an_13.mp4", type:'video/mp4; codecs="avc1.42E01E, mp4a.40.2"' },
					{ src:"video/CC_an_13.ogv", type:'video/ogg; codecs="theora, vorbis"' }
				],
				srt: {
					data: "",
					text: hereDoc(function() {/*!
*/})
				}
			},
			video2: { 
				videoId: "vYdjHhDGAUI",
				sources: [ 
					{ src:"video/One-Life-Saved-FINAL.mp4", type:'video/mp4; codecs="avc1.42E01E, mp4a.40.2"' },
					{ src:"video/One-Life-Saved-FINAL.ogv", type:'video/ogg; codecs="theora, vorbis"' }
				],
				srt: {
					data: "",
					text: hereDoc(function() {/*!
*/})
				}
			},
			video3: { 
				videoId: "BJUN4LrXi88#!",
				sources: [ 
					{ src:"video/Cryo-Cell-Replication_Master-1280.mp4", type:'video/mp4; codecs="avc1.42E01E, mp4a.40.2"' },
					{ src:"video/Cryo-Cell-Replication_Master-1280.ogv", type:'video/ogg; codecs="theora, vorbis"' }
				],
				srt: {
					data: "",
					text: hereDoc(function() {/*!
*/})
				}
			}
		},
		es: {
			video1: { 
				videoId: "uuqGzMd808c",
				sources: [ 
					{ src:"video/CC_an_13_Spanish.mp4", type:'video/mp4; codecs="avc1.42E01E, mp4a.40.2"' },
					{ src:"video/CC_an_13_Spanish.ogv", type:'video/ogg; codecs="theora, vorbis"' }
				],
				srt: {
					data: "",
					text: hereDoc(function() {/*!
*/})
				}
			},
			video2: { 
				videoId: "vYdjHhDGAUI",
				sources: [ 
					{ src:"video/One-Life-Saved-Spanish-FINAL.mp4", type:'video/mp4; codecs="avc1.42E01E, mp4a.40.2"' },
					{ src:"video/One-Life-Saved-Spanish-FINAL.ogv", type:'video/ogg; codecs="theora, vorbis"' }
				],
				srt: {
					data: "",
					text: hereDoc(function() {/*!
*/})
				}
			},
			video3: { 
				videoId: "BJUN4LrXi88#!",
				sources: [ 
					{ src:"video/Cryo-Cell-Corporate_Master_LAS_1.mp4", type:'video/mp4; codecs="avc1.42E01E, mp4a.40.2"' },
					{ src:"video/Cryo-Cell-Corporate_Master_LAS_1.ogv", type:'video/ogg; codecs="theora, vorbis"' }
				],
				srt: {
					data: "",
					text: hereDoc(function() {/*!
*/})
				}
			}
		},
		ru: {
			video1: { 
				videoId: "uuqGzMd808c",
				sources: [ 
					{ src:"video/Cord_Blood_Educational_Video_Russian.mp4", type:'video/mp4; codecs="avc1.42E01E, mp4a.40.2"' },
					{ src:"video/Cord_Blood_Educational_Video_Russian.ogv", type:'video/ogg; codecs="theora, vorbis"' }
				],
				srt: {
					data: "video/Cord_Blood_Educational_Video_Russian.srt",
					text: hereDoc(function() {/*!
1
00:00:04,000 --> 00:00:09,950
Познакомтесь с типичной американской семьей. Они молоды, красивы и ... она беременна.Поздравляем!

2
00:00:10,000 --> 00:00:13,950
Новый ребенок приносит  новые возможности и целый ряд решений

3
00:00:14,000 --> 00:00:18,450
Одним из наиболее важных решений является хранить ли пуповинную кровь ребенка и ткани.

4
00:00:18,540 --> 00:00:24,790
Мы слышали о хранении пуповинной крови, но мы действительно не знаем, почему мы должны замораживать пуповинную кровь нашего ребенка.

5
00:00:24,800 --> 00:00:27,300
А Вы храните пуповинную кровь ваших детей?

6
00:00:27,350 --> 00:00:34,950
Конечно, я храню - для всех моих детей! Если у вас есть возможность сохранить стволовые вашего ребенка клетки, вы определенно должны это сделать. Позвольте мне объяснить.

7
00:00:35,000 --> 00:00:40,900
Пуповинная кровь и ткани содержат стволовые клетки, строительные блоки всех других тканей в нашем организме.

8
00:00:41,000 --> 00:00:49,900
Стволовые клетки пуповинной крови используются для лечения около 80 заболеваний, включая церебральный паралич, лейкемии, аутоиммунные заболевания и генетические нарушения.

9
00:00:50,000 --> 00:00:51,800
Ого!

10
00:00:51,850 --> 00:00:58,950
Конечно! А на самом деле, как мы становимся старше, многие из этих условий становятся более распространенными, поэтому потребность в этих стволовых клеток может увеличиваться с течением времени

11
00:00:59,080 --> 00:01:04,280
В самом деле, более 30 000 трансплантаций пуповинной крови стволовых клеток уже были выполнены.

12
00:01:04,370 --> 00:01:06,370
Новые методы лечения появляются практически каждый день.

13
00:01:06,500 --> 00:01:12,850
Сохранение стволовых клеток Вашего новорожденного – это одна из самых лучших инвестиций которую вы можете сделать для вашего ребенка и вашей семьи.

14
00:01:12,900 --> 00:01:14,900
Нашей семьи?

15
00:01:15,000 --> 00:01:21,000
Да. Пуповинная кровь может быть использована для лечения вашего ребенка, братьев и сестер или других близких членов семьи, в зависимости от заболевания.

16
00:01:21,150 --> 00:01:26,650
Вероятность соответствия пересадки гораздо больше, от родственника, чем от неродственного донора.

17
00:01:26,800 --> 00:01:30,400
И при пересадке пациенты выздоравливают лучше, когда донор стволовых клеток близкий родственник.

18
00:01:30,540 --> 00:01:34,540
Вы также должны воспользоваться возможностью хранить стволовые клетки, которые находятся в тканях пуповины.

19
00:01:34,640 --> 00:01:36,840
Эти стволовые клетки другого типа и весьма перспективны.

20
00:01:36,910 --> 00:01:48,460
Они изучаются для лечения в будущем таких болезней, которые более распространены в пожилом возрасте, такие как инфаркт миокарда, инсульт, болезнь Паркинсона, диабет и другие заболевания.

21
00:01:48,600 --> 00:01:51,500
Это потрясающе. Но есть ли здесь какие нибудь риски?

22
00:01:51,550 --> 00:01:58,400
Сбор пуповинной крови и ткани после рождения вашего ребенка занимает несколько минут и не представляет абсолютно никакого риска для матери или ребенка.

23
00:01:58,450 --> 00:02:02,650
Но  у Вас будет только одна возможность для заморозки этих ценных клеток.

24
00:02:02,800 --> 00:02:04,800
Сколько это будет стоить?

25
00:02:05,000 --> 00:02:11,700
Сбор и хранение пуповинной крови в частном банке стволовых клеток будет стоит около $ 2000 плюс небольшая ежегодная плата за хранение.

26
00:02:11,800 --> 00:02:15,900
Банк хранит это в криогенных морозильниках для исключительного использования вашей семьей.

27
00:02:16,000 --> 00:02:18,300
Кредитные планы позволяют сделать это очень доступным.

28
00:02:18,400 --> 00:02:20,400
Есть ли другие способы?

29
00:02:20,500 --> 00:02:23,800
Если вы не захотите хранить стволовые вашего ребенка клетки для своей семьи,

30
00:02:23,850 --> 00:02:29,450
Вы сможете пожертвовать их в общественный банк для использования другими лицами, которые имеют неотложную медицинскую необходимость.

31
00:02:29,500 --> 00:02:34,090
Каждый год тысячи пациентов ищут подходящего донора в общественном банке,

32
00:02:34,150 --> 00:02:37,500
и стволовых вашего ребенка клетки могут подойти, чтобы спасти чью-то жизнь.

33
00:02:37,550 --> 00:02:44,350
Однако, как только вы сдадите их в общественный банк, они не могут быть доступны для вашего ребенка или семьи в будущем.

34
00:02:44,200 --> 00:02:48,000
В этом случае, вам придется самим надеяться, что совпадение для Вас придет во время

35
00:02:48,120 --> 00:02:57,920
По состоянию на 2013 год, расходы на приобретение соответствующих стволовых клеток из общественного банка составляет около $ 35 000 и включены в качестве части платы за больничное лечение.

36
00:02:58,000 --> 00:03:00,400
Но как мы узнаем, какой частный банк выбрать?

37
00:03:00,450 --> 00:03:03,850
Взвесте все, прежде чем выбрать банк для хранения пуповинной крови.

38
00:03:04,020 --> 00:03:11,270
Проверьте аккредитации, записи успешного терапевтического применения и гарантии

39
00:03:11,350 --> 00:03:13,450
Через несколько месяцев

40
00:03:13,510 --> 00:03:15,810
Родовая палата

41
00:03:21,000 --> 00:03:24,750
Спокойствие для всей вашей семьи.

*/})
				}
			},
			video2: { 
				videoId: "vYdjHhDGAUI",
				sources: [ 
					{ src:"video/One-Life-Saved-FINAL.mp4", type:'video/mp4; codecs="avc1.42E01E, mp4a.40.2"' },
					{ src:"video/One-Life-Saved-FINAL.ogv", type:'video/ogg; codecs="theora, vorbis"' }
				],
				srt: {
					data: "",
					text: hereDoc(function() {/*!
*/})
				}
			},
			video3: { 
				videoId: "BJUN4LrXi88#!",
				sources: [ 
					{ src:"video/Cryo-Cell-Replication_Master-1280.mp4", type:'video/mp4; codecs="avc1.42E01E, mp4a.40.2"' },
					{ src:"video/Cryo-Cell-Replication_Master-1280.ogv", type:'video/ogg; codecs="theora, vorbis"' }
				],
				srt: {
					data: "",
					text: hereDoc(function() {/*!
*/})
				}
			}
		},
		it: {
			video1: { 
				videoId: "uuqGzMd808c",
				sources: [ 
					{ src:"video/CC_an_13.mp4", type:'video/mp4; codecs="avc1.42E01E, mp4a.40.2"' },
					{ src:"video/CC_an_13.ogv", type:'video/ogg; codecs="theora, vorbis"' }
				],
				srt: {
					data: "",
					text: hereDoc(function() {/*!
*/})
				}
			},
			video2: { 
				videoId: "vYdjHhDGAUI",
				sources: [ 
					{ src:"video/One-Life-Saved-FINAL.mp4", type:'video/mp4; codecs="avc1.42E01E, mp4a.40.2"' },
					{ src:"video/One-Life-Saved-FINAL.ogv", type:'video/ogg; codecs="theora, vorbis"' }
				],
				srt: {
					data: "",
					text: hereDoc(function() {/*!
*/})
				}
			},
			video3: { 
				videoId: "BJUN4LrXi88#!",
				sources: [ 
					{ src:"video/Cryo-Cell-Replication_Master-1280.mp4", type:'video/mp4; codecs="avc1.42E01E, mp4a.40.2"' },
					{ src:"video/Cryo-Cell-Replication_Master-1280.ogv", type:'video/ogg; codecs="theora, vorbis"' }
				],
				srt: {
					data: "",
					text: hereDoc(function() {/*!
*/})
				}
			}
		},
		cn: {
			video1: { 
				videoId: "uuqGzMd808c",
				sources: [ 
					{ src:"video/Cord_Blood_Educational_Video_Simplified_Chinese_1.mp4", type:'video/mp4; codecs="avc1.42E01E, mp4a.40.2"' },
					{ src:"video/Cord_Blood_Educational_Video_Simplified_Chinese_1.ogv", type:'video/ogg; codecs="theora, vorbis"' }
				],
				srt: {
					data: "",
					text: hereDoc(function() {/*!
*/})
				}
			},
			video2: { 
				videoId: "vYdjHhDGAUI",
				sources: [ 
					{ src:"video/One-Life-Saved-FINAL.mp4", type:'video/mp4; codecs="avc1.42E01E, mp4a.40.2"' },
					{ src:"video/One-Life-Saved-FINAL.ogv", type:'video/ogg; codecs="theora, vorbis"' }
				],
				srt: {
					data: "",
					text: hereDoc(function() {/*!
*/})
				}
			},
			video3: { 
				videoId: "BJUN4LrXi88#!",
				sources: [ 
					{ src:"video/Cryo-Cell-Replication_Master-1280.mp4", type:'video/mp4; codecs="avc1.42E01E, mp4a.40.2"' },
					{ src:"video/Cryo-Cell-Replication_Master-1280.ogv", type:'video/ogg; codecs="theora, vorbis"' }
				],
				srt: {
					data: "",
					text: hereDoc(function() {/*!
*/})
				}
			}
		},
		tw: {
			video1: { 
				videoId: "uuqGzMd808c",
				sources: [ 
					{ src:"video/Cord_Blood_Educational_Video_Traditional_Chinese_1.mp4", type:'video/mp4; codecs="avc1.42E01E, mp4a.40.2"' },
					{ src:"video/Cord_Blood_Educational_Video_Traditional_Chinese_1.ogv", type:'video/ogg; codecs="theora, vorbis"' }
				],
				srt: {
					data: "",
					text: hereDoc(function() {/*!
*/})
				}
			},
			video2: { 
				videoId: "vYdjHhDGAUI",
				sources: [ 
					{ src:"video/One-Life-Saved-FINAL.mp4", type:'video/mp4; codecs="avc1.42E01E, mp4a.40.2"' },
					{ src:"video/One-Life-Saved-FINAL.ogv", type:'video/ogg; codecs="theora, vorbis"' }
				],
				srt: {
					data: "",
					text: hereDoc(function() {/*!
*/})
				}
			},
			video3: { 
				videoId: "BJUN4LrXi88#!",
				sources: [ 
					{ src:"video/Cryo-Cell-Replication_Master-1280.mp4", type:'video/mp4; codecs="avc1.42E01E, mp4a.40.2"' },
					{ src:"video/Cryo-Cell-Replication_Master-1280.ogv", type:'video/ogg; codecs="theora, vorbis"' }
				],
				srt: {
					data: "",
					text: hereDoc(function() {/*!
*/})
				}
			}
		}
	};
	
	// Кнопки, отображаемые на странице с видео при остановке вопроизведения видео
	// Классы кнопок:
	//		button
	//		button-small
	//		button-mini
	//		button-small-mini
	var videoButtons = {
		en: {
			videoHome: { buttonClass:"button-small-mini", text:"Home" },
			videoStop: { buttonClass:"button-small-mini", text:"Done" },
			videoContact: { buttonClass:"button-mini", text:"Have Questions ?" },
			videoTip: { buttonClass:"", text:"Here you can enable subtitles in your own language" },
			videoSorry: { buttonClass:"", text:"We apologize, but this video shows only in English" }
		},
		es: {
			videoHome: { buttonClass:"button-small-mini", text:"Home" },
			videoStop: { buttonClass:"button-small-mini", text:"Finalizado" },
			videoContact: { buttonClass:"button-mini", text:"¿Tiene preguntas?" },
			videoTip: { buttonClass:"", text:"Aquí puede activar los subtítulos en su propio idioma" },
			videoSorry: { buttonClass:"", text:"Lo sentimos, pero este video muestra sólo en Inglés" }
		},
		ru: {
			videoHome: { buttonClass:"button-small-mini", text:"Главная" },
			videoStop: { buttonClass:"button-small-mini", text:"Стоп" },
			videoContact: { buttonClass:"button-mini", text:"У Вас вопросы ?" },
			videoTip: { buttonClass:"", text:"Здесь вы можете включить субтитры на вашем родном языке" },
			videoSorry: { buttonClass:"", text:"Мы извиняемся, но это видео демонстрируется только на английском языке" }
		},
		it: {
			videoHome: { buttonClass:"button-small-mini", text:"Home" },
			videoStop: { buttonClass:"button-small-mini", text:"Fatto" },
			videoContact: { buttonClass:"button-mini", text:"Sono domande ?" },
			videoTip: { buttonClass:"", text:"Qui è possibile attivare i sottotitoli nella tua lingua" },
			videoSorry: { buttonClass:"", text:"Ci scusiamo, ma il video mostra solo in inglese" }
		},
		cn: {
			videoHome: { buttonClass:"button-small-mini", text:"首頁" },
			videoStop: { buttonClass:"button-small-mini", text:"完成" },
			videoContact: { buttonClass:"button-mini", text:"有疑问吗？" },
			videoTip: { buttonClass:"", text:"您可以在此启用您自己的语言字幕" },
			videoSorry: { buttonClass:"", text:"对不起，该視頻仅有英文版" }
		},
		tw: {
			videoHome: { buttonClass:"button-small-mini", text:"首頁" },
			videoStop: { buttonClass:"button-small-mini", text:"完成" },
			videoContact: { buttonClass:"button-mini", text:"有疑問嗎？" },
			videoTip: { buttonClass:"", text:"您可以在此啟用您自己的語言字幕" },
			videoSorry: { buttonClass:"", text:"對不起，該視頻僅有英文版" }
		}
	};
	
	// Кнопки, отображаемые на странице меню
	// Классы кнопок:
	//		button
	//		button-small
	//		button-mini
	//		button-small-mini
	var menuButtons = {
		en: {
			logo: { buttonClass:"", text:"" },
			replay: { buttonClass:"button", text:"Replay" },
			play: { buttonClass:"button", text:"" },
			prev: { buttonClass:"button-small", text:"" },
			next: { buttonClass:"button-small", text:"" },
			home: { buttonClass:"button", text:"Home" },
			contact: { buttonClass:"button", text:"Have Questions ?" },
			save: { buttonClass:"button", text:"Enter" },
			skip: { buttonClass:"button-mini", text:"Skip" },
			remark: { buttonClass:"", text:"You may be contacted by a Cryo-Cell cord blood educator to answer any questions you have on cord blood." },
			rules: { buttonClass:"", text:"This promotion is subject to the official rules." }
		},
		es: {
			logo: { buttonClass:"", text:"" },
			replay: { buttonClass:"button", text:"Replay" },
			play: { buttonClass:"button", text:"" },
			prev: { buttonClass:"button-small", text:"" },
			next: { buttonClass:"button-small", text:"" },
			home: { buttonClass:"button", text:"Página principal" },
			contact: { buttonClass:"button", text:"¿Tiene preguntas?" },
			save: { buttonClass:"button", text:"Enviar" },
			skip: { buttonClass:"button-mini", text:"Omitir" },
			remark: { buttonClass:"", text:"Usted puede que sea contactado por uno de los educadores de Cryo-Cell, para responder cualquier pregunta que usted tenga acerca del cordón umbilical." },
			rules: { buttonClass:"", text:"Esta promoción está sujeta a las normas oficiales." }
		},
		ru: {
			logo: { buttonClass:"", text:"" },
			replay: { buttonClass:"button", text:"Повторить" },
			play: { buttonClass:"button", text:"" },
			prev: { buttonClass:"button-small", text:"" },
			next: { buttonClass:"button-small", text:"" },
			home: { buttonClass:"button", text:"Главная" },
			contact: { buttonClass:"button", text:"У Вас вопросы ?" },
			save: { buttonClass:"button", text:"Отправить" },
			skip: { buttonClass:"button-mini", text:"Пропустить" },
			remark: { buttonClass:"", text:"C вами свяжется представитель Cryo-Cell, чтобы ответить на Ваши вопросы о хранении пуповинной крови." },
			rules: { buttonClass:"", text:"Участие в акции описано в официальных правилах." }
		},
		it: {
			logo: { buttonClass:"", text:"" },
			replay: { buttonClass:"button", text:"Replay" },
			play: { buttonClass:"button", text:"" },
			prev: { buttonClass:"button-small", text:"" },
			next: { buttonClass:"button-small", text:"" },
			home: { buttonClass:"button", text:"Homepage" },
			contact: { buttonClass:"button", text:"Sono domande ?" },
			save: { buttonClass:"button", text:"Invia" },
			skip: { buttonClass:"button-mini", text:"Salta" },
			remark: { buttonClass:"", text:"You may be contacted by a Cryo-Cell cord blood educator to answer any questions you have on cord blood." },
			rules: { buttonClass:"", text:"This promotion is subject to the official rules." }
		},
		cn: {
			logo: { buttonClass:"", text:"" },
			replay: { buttonClass:"button", text:"重播" },
			play: { buttonClass:"button", text:"" },
			prev: { buttonClass:"button-small", text:"" },
			next: { buttonClass:"button-small", text:"" },
			home: { buttonClass:"button", text:"首頁" },
			contact: { buttonClass:"button", text:"有疑问吗？" },
			save: { buttonClass:"button", text:"提交" },
			skip: { buttonClass:"button-mini", text:"跳过" },
			remark: { buttonClass:"", text:"Cryo-Cell的脐血教育人员有可能会和您联络，以解答您对脐血的相关疑问。" },
			rules: { buttonClass:"", text:"此活动须遵守其正式规则。" }
		},
		tw: {
			logo: { buttonClass:"", text:"" },
			replay: { buttonClass:"button", text:"重播" },
			play: { buttonClass:"button", text:"" },
			prev: { buttonClass:"button-small", text:"" },
			next: { buttonClass:"button-small", text:"" },
			home: { buttonClass:"button", text:"首頁" },
			contact: { buttonClass:"button", text:"有疑問嗎？" },
			save: { buttonClass:"button", text:"提交" },
			skip: { buttonClass:"button-mini", text:"跳過" },
			remark: { buttonClass:"", text:"Cryo-Cell的臍血教育人員有可能會和您聯絡，以解答您對此活動須遵守其正式規則臍血的相關疑問。" },
			rules: { buttonClass:"", text:"此活動須遵守其正式規則" }
		}
	};
	// Шаблоны форм, отображаемых на страницах
	// Задаются в виде html кода
	var pageForms = {
		page0: { 
			form: hereDoc(function() {/*!
<form id="callbackForm" action="http://promos.cryo-cell.com/fsg?pageId=8ec38da2-ccb3-11e2-a1f8-12313e0080a1&variant=a" method="POST">
<input type="hidden" name="pageId" value="8ec38da2-ccb3-11e2-a1f8-12313e0080a1"/>
<input type="hidden" name="pageVariant" value="a"/>    
<input type="hidden" name="url" value=""/>
<input type="hidden" name="ipad_id" value=""/>
    <table width="100%" border="0" cellpadding="2" cellspacing="0">
    	<tr>
            <td width="35%" align="left"><label for="first_name">First Name</label></td>
            <td width="65%"><input type="text" id="first_name" name="first_name" class="required" /></td>
        </tr>
        <tr>
            <td align="left"><label for="last_name" class="main">Last Name</label></td>
            <td><input type="text" id="last_name" name="last_name" class="required" /></td>
        </tr>
        <tr>
            <td align="left"><label for="due_date" class="main">Expected Delivery Date</label></td>
            <td><input type="date" id="due_date" name="due_date" class="" /></td>
        </tr>
        <tr>
            <td align="left"><label for="phone_number" >Phone Number</label></td>
            <td><input type="tel" id="phone_number" name="phone_number" class="required" /></td>
        </tr>
        <tr>
            <td align="left"><label for="email" >Email</label></td>
            <td><input type="email" id="email" name="email" class="required email"/></td>
        </tr>
        <tr>
            <td align="left"><label for="doctor" >Doctor</label></td>
            <td><input type="text" id="doctor" name="doctor" class="required"/></td>
        </tr>
        <tr>
            <td colspan="2" align="center" valign="middle"><input type="checkbox" id="sweepstakes" name="sweepstakes" class="styled" checked="checked" /><label for="sweepstakes" >I want to participate sweepstakes</label></td>
        </tr>
    </table>
</form>
*/}),
		},
		page1: { 
			form: hereDoc(function() {/*!
*/}),
		},
		page2: { 
			form: hereDoc(function() {/*!
*/}),
		},
		page3: { 
			form: hereDoc(function() {/*!
*/}),
		},
		page4: { 
			form: hereDoc(function() {/*!
<form id="callbackForm" action="http://promos.cryo-cell.com/fsg?pageId=8ec38da2-ccb3-11e2-a1f8-12313e0080a1&variant=a" method="POST">
<input type="hidden" name="pageId" value="8ec38da2-ccb3-11e2-a1f8-12313e0080a1"/>
<input type="hidden" name="pageVariant" value="a"/>    
<input type="hidden" name="url" value=""/>
<input type="hidden" name="ipad_id" value=""/>
<input type="hidden" name="havequestions" value="on"/>
    <table width="100%" border="0" cellpadding="2" cellspacing="0">
    	<tr>
            <td width="35%" align="left"><label for="first_name">First Name</label></td>
            <td width="65%"><input type="text" id="first_name" name="first_name" class="required" required /></td>
        </tr>
        <tr>
            <td align="left"><label for="last_name" class="main">Last Name</label></td>
            <td><input type="text" id="last_name" name="last_name" class="required" required /></td>
        </tr>
        <tr>
            <td align="left"><label for="due_date" class="main">Expected Delivery Date</label></td>
            <td><input type="date" id="due_date" name="due_date" class="" /></td>
        </tr>
        <tr>
            <td align="left"><label for="phone_number" >Phone Number</label></td>
            <td><input type="tel" id="phone_number" name="phone_number" class="required" required /></td>
        </tr>
        <tr>
            <td align="left"><label for="email" >Email</label></td>
            <td><input type="email" id="email" name="email" class="required email" required /></td>
        </tr>
        <tr>
            <td align="left"><label for="doctor" >Doctor</label></td>
            <td><input type="text" id="doctor" name="doctor" class="required" required /></td>
        </tr>
    </table>
</form>
*/}),
		},
		page5: { 
			form: hereDoc(function() {/*!
*/}),
		},
	};
	
	// Шаблоны заголовков и субтитлов, отображаемых на страницах
	// Задаются в виде html кода
	// Переданные аргументы могут быть вставленны в шаблон в виде ##имя##
	var pages = {
		en: {
			page0: { 
				preamble: hereDoc(function() {/*!
*/}),
				title: hereDoc(function() {/*!
Cryo-Cell invites you to learn more about cord blood banking
*/}),
				subtitle: hereDoc(function() {/*!
<span style='font-weight: bolder; font-size: larger;'>##doctor##</span> would like you to watch a brief video on the importance of preserving your baby's cord blood and tissue. This video was developed in collaboration with Parent's Guide to Cord Blood Foundation. Many states mandate that expectant parents are educated on the benefits of cord blood banking and provided with this type of educational material.<br />Please fill in the form below to proceed :
*/}), 
			},
			page1: { 
				preamble: hereDoc(function() {/*!
*/}),
				title: hereDoc(function() {/*!
Why should you store<br />your baby’s cord blood?
*/}),
				subtitle: hereDoc(function() {/*!
Watch an animated video on cord blood stem cells.
*/}),
			},
			page2: {
				preamble: hereDoc(function() {/*!
*/}),
				title: hereDoc(function() {/*!
How can cord blood save lives?
*/}),
				subtitle: hereDoc(function() {/*!
Watch a 3 minute video on one family’s story.
*/}),
			},
			page3: { 
				preamble: hereDoc(function() {/*!
*/}),
				title: hereDoc(function() {/*!
Why choose <span nowrap>Cryo-Cell</span>?
*/}),
				subtitle: hereDoc(function() {/*!
Watch a video on the world’s leading cord blood company.
*/}),
			},
			page4: { 
				preamble: hereDoc(function() {/*!
*/}),
				title: hereDoc(function() {/*!
Thank you
*/}),
				subtitle: hereDoc(function() {/*!
We hope you found these brief videos informative.<br />To learn more about our services, please fill in the contact form below.
*/}),
			},
			page5: { 
				preamble: hereDoc(function() {/*!
*/}),
				title: hereDoc(function() {/*!
Thank you
*/}),
				subtitle: hereDoc(function() {/*!
Your request has been sent.<br />One of our client services advisors will contact you shortly.
*/}),
			}
		},
		es: {
			page0: { 
				preamble: hereDoc(function() {/*!
*/}),
				title: hereDoc(function() {/*!
Cryo-Cell le invita a aprender más sobre la sangre del cordón umbilical
*/}),
				subtitle: hereDoc(function() {/*!
<span style='font-weight: bolder; font-size: larger;'>##doctor##</span> lo invita a ver un breve video acerca de la importancia de preservar la sangre y el tejido del cordón umbilical de su bebé en el momento del nacimiento. Este video fue desarrollado en colaboración con Parent's Guide to Cord Blood Foundation para instruir a futuros padres sobre las opciones que potencialmente salvan vidas. Muchos estados exigen que los futuros padres sean educados sobre los beneficios de almacenar la sangre del cordón umbilical y que se les sea proporcionado con este tipo de material educativo.<br />Por favor complete el siguiente formulario para continuar:
*/}),
			},
			page1: { 
				preamble: hereDoc(function() {/*!
*/}),
				title: hereDoc(function() {/*!
¿Por qué debe almacenar la sangre del cordón umbilical de su bebé?
*/}),
				subtitle: hereDoc(function() {/*!
Vea un breve vídeo animado sobre las células madre del cordón umbilical.
*/}),
			},
			page2: {
				preamble: hereDoc(function() {/*!
*/}),
				title: hereDoc(function() {/*!
¿Cómo la sangre del cordón umbilical puede salvar vidas?
*/}),
				subtitle: hereDoc(function() {/*!
Vea el siguiente video de 3 minutos sobre la historia de una familia.
*/}),
			},
			page3: { 
				preamble: hereDoc(function() {/*!
*/}),
				title: hereDoc(function() {/*!
¿Por qué elegir Cryo-Cell?
*/}),
				subtitle: hereDoc(function() {/*!
Vea un breve video sobre la compañía líder en la preservación de la sangre del cordón umbilical.
*/}),
			},
			page4: { 
				preamble: hereDoc(function() {/*!
*/}),
				title: hereDoc(function() {/*!
Gracias
*/}),
				subtitle: hereDoc(function() {/*!
Esperamos que haya encontrado estos breves videos muy informativos.<br />Para obtener más información, por favor complete el siguiente formulario.
*/}),
			},
			page5: { 
				preamble: hereDoc(function() {/*!
*/}),
				title: hereDoc(function() {/*!
Gracias
*/}),
				subtitle: hereDoc(function() {/*!
Su solicitud ha sido enviada.<br />Muy pronto uno de nuestros asesores de servicio al cliente se pondrá en contacto con usted.
*/}),
			}
		},
		ru: {
			page0: { 
				preamble: hereDoc(function() {/*!
*/}),
				title: hereDoc(function() {/*!
Cryo-Cell предлагает Вам узнать больше о сохранении стволовых клеток из пуповинной крови
*/}),
				subtitle: hereDoc(function() {/*!
<span style='font-weight: bolder; font-size: larger;'>##doctor##</span> приглашает Вас посмотреть видео о сохранении пуповинной крови Вашего ребёнка. Это видео создано совместно с Parent's Guide to Cord Blood Foundation с целью информирования будущих родителей о возможностях по сохранению здоровья. Правительства большинства Штатов считает, что будущие родители должны быть осведомлены о преимуществах сбора пуповииной крови и рекомендует такой вид предоставления учебного материала. Пожалуйста, заполните форму ниже, чтобы продолжить :
*/}),
			},
			page1: { 
				preamble: hereDoc(function() {/*!
*/}),
				title: hereDoc(function() {/*!
Почему Вы должны сохранить пуповинную кровь Вашего ребенка?
*/}),
				subtitle: hereDoc(function() {/*!
Смотрите анимационное видео о стволовых клетках в пуповинной крови.
*/}),
			},
			page2: {
				preamble: hereDoc(function() {/*!
*/}),
				title: hereDoc(function() {/*!
Как пуповинная кровь<br />спасает жизнь?
*/}),
				subtitle: hereDoc(function() {/*!
Смотрите 3-х минутное видео истории одной семьи.
*/}),
			},
			page3: { 
				preamble: hereDoc(function() {/*!
*/}),
				title: hereDoc(function() {/*!
Почему выбирают <span nowrap>Cryo-Cell</span>?
*/}),
				subtitle: hereDoc(function() {/*!
Смотрите видео о ведущей компании в мире, сохраняющей пуповинную кровь.
*/}),
			},
			page4: { 
				preamble: hereDoc(function() {/*!
*/}),
				title: hereDoc(function() {/*!
Спасибо
*/}),
				subtitle: hereDoc(function() {/*!
Мы надеемся, что вы нашли это видео полезным.<br />Чтобы узнать больше о наших услугах, пожалуйста, заполните форму ниже.
*/}),
			},
			page5: { 
				preamble: hereDoc(function() {/*!
*/}),
				title: hereDoc(function() {/*!
Спасибо
*/}),
				subtitle: hereDoc(function() {/*!
Ваше сообщение было отправлено.<br />Наш представитель по обслуживанию клиентов свяжется с Вами в ближайшее время.
*/}),
			}
		},
		it: {
			page0: { 
				preamble: hereDoc(function() {/*!
*/}),
				title: hereDoc(function() {/*!
Learn about cord blood banking!
*/}),
				subtitle: hereDoc(function() {/*!
<span style='font-weight: bolder; font-size: larger;'>##doctor##</span> invites you to watch a brief video on the importance of preserving your baby's cord blood and tissue at birth. This video was developed in collaboration with Parent's Guide to Cord Blood Foundation to educate future parents about life saving options.<br />Please fill in the form below to proceed :
*/}),
			},
			page1: { 
				preamble: hereDoc(function() {/*!
*/}),
				title: hereDoc(function() {/*!
Why should you store<br />your baby’s cord blood?
*/}),
				subtitle: hereDoc(function() {/*!
Watch an animated video on cord blood stem cells.
*/}),
			},
			page2: {
				preamble: hereDoc(function() {/*!
*/}),
				title: hereDoc(function() {/*!
How can cord blood save lives?
*/}),
				subtitle: hereDoc(function() {/*!
Watch a 3 minute video on one family’s story.
*/}),
			},
			page3: { 
				preamble: hereDoc(function() {/*!
*/}),
				title: hereDoc(function() {/*!
Perché scegliere <span nowrap>Cryo-Cell</span>?
*/}),
				subtitle: hereDoc(function() {/*!
Watch a video on the world’s leading cord blood company.
*/}),
			},
			page4: { 
				preamble: hereDoc(function() {/*!
*/}),
				title: hereDoc(function() {/*!
Grazie
*/}),
				subtitle: hereDoc(function() {/*!
We hope you found these videos informative.<br />To learn more about our services, please fill in the contact form below.
*/}),
			},
			page5: { 
				preamble: hereDoc(function() {/*!
*/}),
				title: hereDoc(function() {/*!
Grazie
*/}),
				subtitle: hereDoc(function() {/*!
Your request has been sent.<br />One of our client services representatives will contact you shortly.
*/}),
			}
		},
		cn: {
			page0: { 
				preamble: hereDoc(function() {/*!
*/}),
				title: hereDoc(function() {/*!
Cryo-Cell在此诚邀您增进对脐带血储存的认识。
*/}),
				subtitle: hereDoc(function() {/*!
<span style='font-weight: bolder; font-size: larger;'>##doctor##</span>邀请您观看一段简短的视频， 有关保存出生婴儿脐带血液和组织的重要性。<br />
该视频为我们會同Parent's Guide to Cord Blood基金会共同制作的。<br />许多州强制要求准父母必须接受有关储存脐带血的教育及获得相关教材，从而了解其诸多裨益。<br />
请您先填写下表：
*/}),
			},
			page1: { 
				preamble: hereDoc(function() {/*!
*/}),
				title: hereDoc(function() {/*!
为什么您应该储存宝宝的脐带血？
*/}),
				subtitle: hereDoc(function() {/*!
请观赏一段有关脐带血干细胞的动画短视频。
*/}),
			},
			page2: {
				preamble: hereDoc(function() {/*!
*/}),
				title: hereDoc(function() {/*!
脐带血如何能挽救生命？
*/}),
				subtitle: hereDoc(function() {/*!
请观赏一段3分钟的视频：一个家庭的故事。
*/}),
			},
			page3: { 
				preamble: hereDoc(function() {/*!
*/}),
				title: hereDoc(function() {/*!
为何选择Cryo-Cell?
*/}),
				subtitle: hereDoc(function() {/*!
请观赏一段短视频，为您介绍领先世界的脐带血公司。
*/}),
			},
			page4: { 
				preamble: hereDoc(function() {/*!
*/}),
				title: hereDoc(function() {/*!
谢谢
*/}),
				subtitle: hereDoc(function() {/*!
希望这些短视频对您有所助益。<br />若想更加了解我们的服务，请填写下列联系表格。
*/}),
			},
			page5: { 
				preamble: hereDoc(function() {/*!
*/}),
				title: hereDoc(function() {/*!
谢谢
*/}),
				subtitle: hereDoc(function() {/*!
您的要求已送出<br />我们的客户服务代表将很快地与您联系.
*/}),
			}
		},
		tw: {
			page0: { 
				preamble: hereDoc(function() {/*!
*/}),
				title: hereDoc(function() {/*!
Cryo-Cell在此誠邀您增進對臍帶血儲存的認識。
*/}),
				subtitle: hereDoc(function() {/*!
<span style='font-weight: bolder; font-size: larger;'>##doctor##</span>邀請您觀看一段簡短的視頻， 有關保存出生嬰兒臍帶血液和組織的重要性。<br />
該視頻為我們會同Parent's Guide to Cord Blood基金會共同製作的。<br />許多州強制要求準父母必須接受有關儲存臍帶血的教育及獲得相關教材，從而了解其諸多裨益。<br />
請您先填寫下表：
*/}),
			},
			page1: { 
				preamble: hereDoc(function() {/*!
*/}),
				title: hereDoc(function() {/*!
為什麼您應該儲存寶寶的臍帶血？
*/}),
				subtitle: hereDoc(function() {/*!
請觀賞一段有關臍帶血幹細胞的卡通短視頻。
*/}),
			},
			page2: {
				preamble: hereDoc(function() {/*!
*/}),
				title: hereDoc(function() {/*!
臍帶血如何能挽救生命？
*/}),
				subtitle: hereDoc(function() {/*!
請觀賞一段3分鐘的視頻：一個家庭的故事。
*/}),
			},
			page3: { 
				preamble: hereDoc(function() {/*!
*/}),
				title: hereDoc(function() {/*!
為何選擇Cryo-Cell？
*/}),
				subtitle: hereDoc(function() {/*!
請觀賞一段短視頻，為您介紹領先世界的臍帶血公司
*/}),
			},
			page4: { 
				preamble: hereDoc(function() {/*!
*/}),
				title: hereDoc(function() {/*!
謝謝
*/}),
				subtitle: hereDoc(function() {/*!
希望這些短視頻對您有所助益。<br />若想更加了解我們的服務，請填寫下列聯繫表格。
*/}),
			},
			page5: { 
				preamble: hereDoc(function() {/*!
*/}),
				title: hereDoc(function() {/*!
謝謝
*/}),
				subtitle: hereDoc(function() {/*!
您的要求已送出<br />我們的客戶服務代表將很快地與您聯繫.
*/}),
			}
		}
	};
	
	// Названия полей формы обратной связи
	// Задаются в виде обычного текста
	var formLabels = {
		en: {
			first_name: "First Name",
			last_name: "Last Name",
			due_date: "Expected Delivery Date",
			phone_number: "Phone Number",
			email: "Email",
			doctor: "Doctor",
			sweepstakes: hereDoc(function() {/*!
Enter to win FREE cord blood banking!
*/}),
		},
		es: {
			first_name: "Nombre",
			last_name: "Apellido",
			due_date: "Fecha estimada de parto",
			phone_number: "Teléfono",
			email: "Correo electrónico",
			doctor: "Médico",
			sweepstakes: hereDoc(function() {/*!
!Participe para ganar el almacenamiento de la sangre del cordón umbilical GRATIS!
*/}),
		},
		ru: {
			first_name: "Имя",
			last_name: "Фамилия",
			due_date: "Ожидаемая дата родов",
			phone_number: "Номер телефона",
			email: "Email",
			doctor: "Доктор",
			sweepstakes: hereDoc(function() {/*!
Зарегистрироваться, чтобы выиграть БЕСПЛАТНОЕ хранение пуповинной крови!
*/}),
		},
		it: {
			first_name: "Nome",
			last_name: "Cognome",
			due_date: "Data di arrivo",
			phone_number: "Numero di telefono",
			email: "Email",
			doctor: "Doctor",
			sweepstakes: hereDoc(function() {/*!
Enter to win FREE cord blood banking!
*/}),
		},
		cn: {
			first_name: "名",
			last_name: "姓",
			due_date: "预产期",
			phone_number: "电话号码",
			email: "电子邮件",
			doctor: "醫生",
			sweepstakes: hereDoc(function() {/*!
参加抽奖，赢取免费的脐血储存！
*/}),
		},
		tw: {
			first_name: "名",
			last_name: "姓",
			due_date: "預產期",
			phone_number: "電話號碼",
			email: "電子郵件",
			doctor: "醫生",
			sweepstakes: hereDoc(function() {/*!
參加抽獎，贏取免費的臍血儲存！
*/}),
		}
	};
	
	// Заголовок и вопрос в форме, открываемой при отсутствии параметров в адресной строке
	// Заголовок задаётся в виде html кода
	// Вопрос задаётся в виде обычного теста
	var surveys = {
		en: {
			title: hereDoc(function() {/*!
<strong>Welcome to the Cord Blood<br />Education Program</strong>
*/}),
			label: hereDoc(function() {/*!
Please enter below the name of the Ob/Gyn practice or doctor where you heard about these videos:
*/}),
		},
		es: {
			title: hereDoc(function() {/*!
<strong>Bienvenido al programa de Educación de la Sangre del Cordón Umbilical</strong>
*/}),
			label: hereDoc(function() {/*!
Por favor ingresar el nombre del consultorio o de su médico obstetra / ginecólogo:
*/}),
		},
		ru: {
			title: hereDoc(function() {/*!
<strong>Добро пожаловать в программу обучения<br />по сохранению пуповинной крови</strong>
*/}),
			label: hereDoc(function() {/*!
Пожалуйста, укажите генекологическую практику или доктора, где или от которого Вы узнали об этом видео:
*/}),
		},
		it: {
			title: hereDoc(function() {/*!
<strong>Welcome to the Cord Blood<br />Education Program</strong>
*/}),
			label: hereDoc(function() {/*!
Please enter below the name of the Ob/Gyn practice or doctor where you heard about these videos:
*/}),
		},
		cn: {
			title: hereDoc(function() {/*!
<strong>欢迎观赏这个脐带血教育节目</strong>
*/}),
			label: hereDoc(function() {/*!
请在下面输入您的妇产科医生或诊所的名称:
*/}),
		},
		tw: {
			title: hereDoc(function() {/*!
<strong>歡迎觀賞這個臍帶血教育節目</strong>
*/}),
			label: hereDoc(function() {/*!
請在下面輸入您的婦產科醫生或診所的名稱:
*/}),
		}
	};
	
	// Список поддерживаемых языков
	var languages = {
		en: "English",
		es: "Español",
		ru: "Русский",
		cn: "简体中文",
		tw: "繁體中文"
	};
	
	try {
		var kioskId = (kioskpro_id.toString().split(" ").join(""));
		localStorage.setItem("KioskProID", kioskId);
	} catch (e) {
	}
	
	// Определение ID, заданного в Kiosk Pro
	function getID() {
		var iPadID = "iPadID is not set";
		try {
			iPadID = localStorage.getItem("KioskProID");
		} catch(e) {
			iPadID = "iPadID is not set";
		}
		return iPadID;
	}
	
	function isKioskPro() {
		var bool = true;
		try {
			var iPadID = localStorage.getItem("KioskProID");
			bool = iPadID && iPadID != "";
		} catch(e) {
			bool = false;
		}
		return bool;
	}
	
	function isCordova() {
		var bool = false;
		try {
			bool = (typeof cordova != 'undefined') || (typeof Cordova != 'undefined');
		} catch(e) {
		}
		return bool;
	}
	
	function isMobileSafari() {
		return navigator.userAgent.match(/(iPod|iPhone|iPad)/) 
			&& navigator.userAgent.match(/AppleWebKit/) 
			&& (!isKioskPro()) 
			&& (!isCordova());
	}
	
	function currentCallbackForm() { return $("#callbackForm",currentMenuPage()); }
	function currentMenuPage() { return $(".menu-page." + currentLanguage).get(currentIndex); }
	function currentVideoPage() { return $(".video-page." + currentLanguage).get(currentIndex-1); }
	function currentVideoHome() { return $(".videoHome",currentVideoPage()); }
	function currentVideoStop() { return $(".videoStop",currentVideoPage()); }
	function currentVideoContact() { return $(".videoContact",currentVideoPage()); }
	function currentPlayer() { return $(currentVideoPage()).find("video").get(0); }
	function currentJsPlayer() { return document.getElementById("jsplayer-"+$(currentVideoPage()).attr("id")); }
	function currentFramePlayer() { return YtPlayers[$(currentVideoPage()).attr("id")]; }
	function currentTubePlayer() { return $(".tubeplayer",currentVideoPage()); }
	function nextIndex(index) { index++ ; if(index >= 5) index = 5; return index; }
	function prevIndex(index) { index-- ; if(index < 0) index = 0; return index; }
	function showCurrentMenu() { $(currentMenuPage()).fadeIn("slow"); }
	function hideCurrentMenu() { $(currentMenuPage()).fadeOut("slow"); }
	function showCurrentVideo() { 
		var page = $(currentVideoPage());
		var tip = $(".videoTip",page);
		var sorry = $(".videoSorry",page);
		page.show(); 
		
		// При просмотре видео в нижней (черной) части экрана нужно добавить кнопку со стрелочкой,
		// которая будет указывать "здесь вы можете включить субтитры на вашем родном языке" 
		tip.toggle(!isKioskPro());
		
		// В связи с тем, что только одно видео в проекте имеет перевод или субтитры, 
		// то на всех последующих страницах нужно добавить фразу 
		// "Мы извиняемся, но это видео демонстрируется только на английском языке" 
		sorry.toggle(page.hasClass("en")==false && !isKioskPro() && !isCordova());
		if(isMobileSafari()) {
			createYoutubePlayer(page);
		}
	}
	function hideCurrentVideo() { 
		var page = $(currentVideoPage());
		var playerid = "jsplayer-"+page.attr("id");
		playerReadyDeferred[playerid] = $.Deferred();
		if(isMobileSafari()) {
			destroyCurrentPlayer();
		}
		$(currentVideoPage()).hide(); 
	}
	function showCurrentVideoHome() { $(currentVideoHome()).fadeIn(); }
	function hideCurrentVideoHome() { $(currentVideoHome()).fadeOut(); }
	function showCurrentVideoStop() { $(currentVideoStop()).fadeIn(); }
	function hideCurrentVideoStop() { $(currentVideoStop()).fadeOut(); }
	function showCurrentVideoContact() { $(currentVideoContact()).fadeIn(); }
	function hideCurrentVideoContact() { $(currentVideoContact()).fadeOut(); }
	function showCurrentVideoMenu() { 
		showCurrentVideoHome();
		showCurrentVideoStop();
		showCurrentVideoContact();
	}
	function hideCurrentVideoMenu() { 
		hideCurrentVideoHome();
		hideCurrentVideoStop();
		hideCurrentVideoContact();
	}
	function showBuffering() { $("#buffering").show(); }
	function hideBuffering() { $("#buffering").hide(); }
	function fullScreen() { $("#window").fullScreen(true); }
	function updateHeight() { $("#window").height($(window).height()); }
	function showRulesDialog() { 
		debugWrite("showRulesDialog","start");
		showRules = true;
		$("#rulesForm." + currentLanguage +"").keypress(function(event) {
			if (event.keyCode == $.ui.keyCode.ENTER) {
				if (event.preventDefault) { event.preventDefault(); } else { event.returnValue = false; }
				debugWrite("event.keyCode","ENTER");
				$(this).dialog("close");
				showRules = false;
				return false;
			}
		});
		$("#rulesForm." + currentLanguage +"").dialog({
			minWidth: 960,
			buttons: {
				"Close": function() {
					showRules = false;
					$(this).dialog("close");
					return false;
				}
			}
		}); 
		debugWrite("showRulesDialog","end");
	}
	function hideRulesDialog() { 
		if(showRules) {
			$("#rulesForm." + currentLanguage +"").dialog("close");
		}
		$("#rulesForm").hide(); 
	}
	
	function showSurveyDialog() { 
		showSurvey = true;
		$("#surveyForm." + currentLanguage +"").keypress(function(event) {
			if (event.keyCode == $.ui.keyCode.ENTER) {
				if (event.preventDefault) { event.preventDefault(); } else { event.returnValue = false; }
				debugWrite("event.keyCode","ENTER");
				debugWrite("Ответ",$("." + currentLanguage +" input[name*='answer']").val());
				$("input[name*='doctor']").val($("." + currentLanguage +" input[name*='answer']").val()); 
				$(this).dialog("close");
				showSurvey = false;
				return false;
			}
		});
		$("#surveyForm." + currentLanguage +"").dialog({
			minWidth: 480,
			buttons: {
				"Submit": function() {
					debugWrite("Ответ",$("." + currentLanguage +" input[name*='answer']").val());
					$("input[name*='doctor']").val($("." + currentLanguage +" input[name*='answer']").val()); 
					$(this).dialog("close");
					showSurvey = false;
					return false;
				}
			}
		}); 
	}
	function hideSurveyDialog() { 
		if(showSurvey) {
			$("#surveyForm." + currentLanguage +"").dialog("close");
		}
		$("#surveyForm").hide(); 
	}
	
	function hideDoctor() { 
		$("input[name*='doctor']").removeClass("required"); 
		$("input[name*='doctor']").hide(); 
		$("label[for*='doctor']").hide(); 
	}
	function clearForm() { 
		$("input[name*='expected_delivery_date']").val("");
		$("input[name*='due_date']").val("");
		$("input[name*='phone']").val("");
		$("input[name*='first_name']").val("");
		$("input[name*='last_name']").val("");
		$("input[name*='mail']").val("");
	//	$("input[name*='doctor']").val("");
		$("input").removeClass("error");
		$(".error").remove();
		$(".ErrorLabel").remove();
		$(".EditingFormErrorLabel").remove();
		
		$("input#sweepstakes").each(function (index,element) {
			element.checked = true;
		});
		Custom.clear();
		$(".skip").hide();
	}
	
	function playCurrentPlayer() {
		if (0 < currentIndex && currentIndex < 4) {
			var page = $(currentVideoPage());
			if ($(".tubeplayer",page).length) {
				try {
					var tubeplayer = currentTubePlayer();
					var playerid = $(tubeplayer).attr("id");
					if(playerActivated[playerid]) $.when(playerReadyDeferred[playerid]).then(function() {
						tubeplayer.tubeplayer("play");
					});
				}
				catch(e) {
					debugWrite("tubeplayer:",e);
				}
			}
			else if ($(".iframeplayer",page).length) {
				try {
					var iframeplayer = currentFramePlayer();
					var playerid = iframeplayer.a.id;
					if(playerActivated[playerid]) $.when(playerReadyDeferred[playerid]).then(function() {
						iframeplayer.playVideo();
					});
				}
				catch(e) {
					debugWrite("youtube player api:",e);
				}
			}
			else if (!isKioskPro() && PlayerApi == 'jsplayer') {
				try {
					var jsplayer = currentJsPlayer();
					var playerid = $(jsplayer).attr("id");
					if(playerActivated[playerid]) $.when(playerReadyDeferred[playerid]).then(function() {
						jsplayer.playVideo();
					});
				}
				catch(e) {
					debugWrite("youtube player api:",e);
				}
			}
			else {
				try {
					var player = currentPlayer();
					var playerid = $(player).attr("id");
					if(playerActivated[playerid]) player.play();
				}
				catch(e) {
					debugWrite("video html5:",e);
				}
			}
		}
	}
	
	function pauseCurrentPlayer() {
		if (0 < currentIndex && currentIndex < 4) {
			var page = $(currentVideoPage());
			if ($(".tubeplayer",page).length) {
				try {
					var tubeplayer = currentTubePlayer();
					var playerid = $(tubeplayer).attr("id");
					$.when(playerReadyDeferred[playerid]).then(function() {
						tubeplayer.tubeplayer("pause");
					});
				}
				catch(e) {
					debugWrite("tubeplayer:",e);
				}
			}
			else if ($(".iframeplayer",page).length) {
				try {
					var iframeplayer = currentFramePlayer();
					var playerid = iframeplayer.a.id;
					$.when(playerReadyDeferred[playerid]).then(function() {
						iframeplayer.pauseVideo();
					});
				}
				catch(e) {
					debugWrite("youtube player api:",e);
				}
			}
			else if (!isKioskPro() && PlayerApi == 'jsplayer') {
				try {
					var jsplayer = currentJsPlayer();
					var playerid = $(jsplayer).attr("id");
					$.when(playerReadyDeferred[playerid]).then(function() {
						jsplayer.pauseVideo();
					});
				}
				catch(e) {
					debugWrite("youtube player api:",e);
				}
			}
			else {
				try {
					var player = currentPlayer();
					player.pause();
				}
				catch(e) {
					debugWrite("video html5:",e);
				}
			}
		}
	}
	
	function activateCurrentPlayer() {
		if (0 < currentIndex && currentIndex < 4) {
			var page = $(currentVideoPage());
			if ($(".tubeplayer",page).length) {
				var tubeplayer = currentTubePlayer();
				var playerid = $(tubeplayer).attr("id");
				playerActivated[playerid] = true;
			}
			else if ($(".iframeplayer",page).length) {
				var iframeplayer = currentFramePlayer();
				var playerid = iframeplayer.a.id;
				playerActivated[playerid] = true;
			}
			else if (!isKioskPro() && PlayerApi == 'jsplayer') {
				var jsplayer = currentJsPlayer();
				var playerid = $(jsplayer).attr("id");
				playerActivated[playerid] = true;
			}
			else {
				var player = currentPlayer();
				var playerid = $(player).attr("id");
				playerActivated[playerid] = true;
			}
		}
	}
	
	function destroyCurrentPlayer() {
		if (0 < currentIndex && currentIndex < 4) {
			var page = $(currentVideoPage());
			if ($(".tubeplayer",page).length) {
				try {
					var tubeplayer = currentTubePlayer();
					var playerid = $(tubeplayer).attr("id");
					tubeplayer.tubeplayer("destroy");
				}
				catch(e) {
					debugWrite("tubeplayer:",e);
				}
			}
	//		else if ($(".iframeplayer",page).length) {
	//			try {
	//				var iframeplayer = currentFramePlayer();
	//				var playerid = iframeplayer.a.id;
	//				$.when(playerReadyDeferred[playerid]).then(function() {
	//					iframeplayer.pauseVideo();
	//				});
	//			}
	//			catch(e) {
	//				debugWrite("youtube player api:",e);
	//			}
	//		}
	//		else if (!isKioskPro() && PlayerApi == 'jsplayer') {
	//			try {
	//				var jsplayer = currentJsPlayer();
	//				var playerid = $(jsplayer).attr("id");
	//				$.when(playerReadyDeferred[playerid]).then(function() {
	//					jsplayer.pauseVideo();
	//				});
	//			}
	//			catch(e) {
	//				debugWrite("youtube player api:",e);
	//			}
	//		}
	//		else {
	//			try {
	//				var player = currentPlayer();
	//				player.pause();
	//			}
	//			catch(e) {
	//				debugWrite("video html5:",e);
	//			}
	//		}
		}
	}
	
	// YouTube JavaScript Player API  
	onYouTubePlayerReady = function (playerid) {
		debugWrite("onYouTubePlayerReady",playerid);
		playerReadyDeferred[playerid].resolve();
		var player = document.getElementById(playerid);
		player.addEventListener("onStateChange", "onStateChange");
		player.addEventListener("onError", "onError");		
	}
	
	onStateChange = function (state) {
		debugWrite("onStateChange",state);
		switch(state) {
		case 0:
			hideCurrentVideoMenu();
			hideCurrentVideo();
			hideBuffering();
			currentIndex = nextIndex(currentIndex);
			showCurrentMenu();
			break;
		case 1:
			activateCurrentPlayer();
			hideBuffering();
			hideCurrentVideoMenu();
			showCurrentVideo();
			hideCurrentMenu();
			break;
		case 2:
			hideBuffering();
			showCurrentVideoMenu();
			break;
		case 3:
	//		showBuffering();
			break;
		}
	}
	
	onError = function (error) {
		debugWrite("onError",error);
	}
	
	// Событие инициализации YouTube Player API
	onYouTubePlayerAPIReady = function () {
		iframePlayerAPIReadyDeferred.resolve();
	}
	
	onPlayerError = function (event) {
		debugWrite("onPlayerError",event);
	}
	  
	onPlayerReady = function (event) {
		debugWrite("onPlayerReady",event);
		var playerid = event.target.a.id;
		playerReadyDeferred[playerid].resolve();
		hideBuffering();
	}
	  
	onPlayerStateChange = function (event) {
		debugWrite("onPlayerStateChange",event);
		switch(event.data) {
		case YT.PlayerState.BUFFERING:
	//		showBuffering();
			break;
		case YT.PlayerState.PAUSED:
			hideBuffering();
			showCurrentVideoMenu();
			break;
		case YT.PlayerState.ENDED:
			hideCurrentVideoMenu();
			hideCurrentVideo();
			hideBuffering();
			currentIndex = nextIndex(currentIndex);
			showCurrentMenu();
			break;
		case YT.PlayerState.PLAYING:
			activateCurrentPlayer();
			hideBuffering();
			hideCurrentVideoMenu();
			showCurrentVideo();
			hideCurrentMenu();
			break;
		}
	}
	
	// Событие инициализации tubeplayer	  	  
	$.tubeplayer.defaults.afterReady = function($player){
		debugWrite("$.tubeplayer.defaults.afterReady",$player);
		var playerid = $player.attr("id");
		playerReadyDeferred[playerid].resolve();
		hideBuffering();
	}
	
	function openCryoCell() {
		var win = window.open("http://www.cryo-cell.com", '_blank');
		win.focus();
	}

	// Процедура кросс-доменной отправки содержимого формы ввода
	// Параметр - отправляемая форма ввода
	function crossDomainSubmit(item) {
		// Add the iframe with a unique name
		var uniqueString = "crossDomainForm-"+$("iframe").length;
		var iframe = document.createElement("iframe");
		document.body.appendChild(iframe);
		iframe.style.display = "none";
		try {
		  iframe.contentWindow.name = uniqueString;
		} catch(e) {
		  debugWrite('iframe.contentWindow.name error',e);
		}
		debugWrite('iframe.contentWindow.name',iframe.contentWindow.name);
	  
		// construct a form with hidden inputs, targeting the iframe
		var form = document.createElement("form");
		form.target = iframe.contentWindow.name;
		debugWrite('form.target',form.target);
		debugWrite('item.attr("action")',item.attr("action"));
		form.action = item.attr("action");
		debugWrite('form.action',form.action);
		debugWrite('item.attr("method")',item.attr("method"));
		form.method = item.attr("method");
		debugWrite('form.method',form.method);
	  
		// repeat for each parameter
		item.find("input").each(function(index, element) {
			var input = document.createElement("input");
			input.type = "hidden";
			debugWrite("element.name",element.name);
			input.name = element.name;
			debugWrite("input.name",input.name);
			debugWrite("element.value",element.value);
			input.value = element.value;
			debugWrite("input.value",input.value);
			form.appendChild(input);
		});
	  
		document.body.appendChild(form);
		form.submit();
	}
	
	function urldecode (str) {
	  // http://kevin.vanzonneveld.net
	  // +   original by: Philip Peterson
	  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	  // +      input by: AJ
	  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	  // +   improved by: Brett Zamir (http://brett-zamir.me)
	  // +      input by: travc
	  // +      input by: Brett Zamir (http://brett-zamir.me)
	  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	  // +   improved by: Lars Fischer
	  // +      input by: Ratheous
	  // +   improved by: Orlando
	  // +      reimplemented by: Brett Zamir (http://brett-zamir.me)
	  // +      bugfixed by: Rob
	  // +      input by: e-mike
	  // +   improved by: Brett Zamir (http://brett-zamir.me)
	  // %        note 1: info on what encoding functions to use from: http://xkr.us/articles/javascript/encode-compare/
	  // %        note 2: Please be aware that this function expects to decode from UTF-8 encoded strings, as found on
	  // %        note 2: pages served as UTF-8
	  // *     example 1: urldecode('Kevin+van+Zonneveld%21');
	  // *     returns 1: 'Kevin van Zonneveld!'
	  // *     example 2: urldecode('http%3A%2F%2Fkevin.vanzonneveld.net%2F');
	  // *     returns 2: 'http://kevin.vanzonneveld.net/'
	  // *     example 3: urldecode('http%3A%2F%2Fwww.google.nl%2Fsearch%3Fq%3Dphp.js%26ie%3Dutf-8%26oe%3Dutf-8%26aq%3Dt%26rls%3Dcom.ubuntu%3Aen-US%3Aunofficial%26client%3Dfirefox-a');
	  // *     returns 3: 'http://www.google.nl/search?q=php.js&ie=utf-8&oe=utf-8&aq=t&rls=com.ubuntu:en-US:unofficial&client=firefox-a'
	  return decodeURIComponent((str + '').replace(/\+/g, '%20'));
	}
	
	function hereDoc(f) {
	  return f.toString().
		  replace(/^[^\/]+\/\*!?/, '').
		  replace(/\*\/[^\/]+$/, '');
	}
	
	// Функция вывода сообщений трассировки
	// Обработка try-catch требуется для совместимости с IE
	function debugWrite(a,b) {
		try {
			console.log(a+":"+b);
		} catch (e) {
		}
	}
	
	// Создание формы вопроса на указанном языке
	function createSurveyForm(lang) {
		debugWrite("createSurveyForm","start");
		debugWrite("lang",lang);
		var form = $(".survey-form-template").clone();
		form.appendTo($("body")).removeClass("survey-form-template").addClass("survey-form");
		form.addClass(lang);
		form.find("#title").html(surveys[lang].title);
		form.find("#label").text(surveys[lang].label);
	
		// Синхронизация полей ввода форм на различных языках
		form.find("input").change(function(event) {
			$("input[name='"+$(this).attr("name")+"']").val($(this).val());
		});
		debugWrite("createSurveyForm","end");
		return form;
	}
	function createRulesForm(lang) {
		debugWrite("createRulesForm","start");
		debugWrite("lang",lang);
		var form = $(".rules-form-template").clone();
		form.appendTo($("body")).removeClass("rules-form-template").addClass("rules-form");
		form.addClass(lang);
		debugWrite("createRulesForm","end");
		return form;
	}
	
	function createYoutubePlayer(page) {
		debugWrite("Инициализация tubeplayer","start");
		page.find(".tubeplayer").each(function(i,e) {
			var playerid = $(e).attr("id");
			playerActivated[playerid] = !isMobileSafari();
			playerReadyDeferred[playerid] = $.Deferred();
			$(e).tubeplayer({
				width: "100%", // the width of the player
				height: 648, // the height of the player
				allowFullScreen: "true", // true by default, allow user to go full screen
				initialVideo: $(e).attr("videoId"), // the video that is loaded into the player
				start: 0, 
				preferredQuality: "default",// preferred quality: default, small, medium, large, hd720
				showControls: 1, // whether the player should have the controls visible, 0 or 1
				showRelated: 0, // show the related videos when the player ends, 0 or 1 
				autoPlay: false, // whether the player should autoplay the video, 0 or 1
				autoHide: false, 
				theme: "dark", // possible options: "dark" or "light"
				color: "red", // possible options: "red" or "white"
				showinfo: false, // if you want the player to include details about the video
				modestbranding: true, // specify to include/exclude the YouTube watermark
				// the location to the swfobject import for the flash player, default to Google's CDN
				wmode: "transparent", // note: transparent maintains z-index, but disables GPU acceleration
				swfobjectURL: "http://ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js",
				loadSWFObject: true, // if you include swfobject, set to false
				// HTML5 specific attrs
				iframed: true, // iframed can be: true, false; if true, but not supported, degrades to flash
				onPlay: function(id){}, // after the play method is called
				onPause: function(){}, // after the pause method is called
				onStop: function(){}, // after the player is stopped
				onSeek: function(time){}, // after the video has been seeked to a defined point
				onMute: function(){}, // after the player is muted
				onUnMute: function(){}, // after the player is unmuted
				onPlayerUnstarted: function(){
					hideBuffering();
					showCurrentVideoMenu();
				}, // when the player returns a state of unstarted
				onPlayerEnded: function(){
					hideCurrentVideoMenu();
					hideCurrentVideo();
					hideBuffering();
					currentIndex = nextIndex(currentIndex);
					showCurrentMenu();
				}, // when the player returns a state of ended
				onPlayerPlaying: function(){
					activateCurrentPlayer();
					hideBuffering();
					hideCurrentVideoMenu();
					showCurrentVideo();
					hideCurrentMenu();
				}, //when the player returns a state of playing
				onPlayerPaused: function(){
					hideBuffering();
					showCurrentVideoMenu();
				}, // when the player returns a state of paused
				onPlayerCued: function(){
					hideBuffering();
				}, // when the player returns a state of cued
				onPlayerBuffering: function(){
					showBuffering();
				}, // when the player returns a state of buffering
				onErrorNotFound: function(){
					debugWrite("tubeplayer","a video cant be found");
				}, // if a video cant be found
				onErrorNotEmbeddable: function(){
					debugWrite("tubeplayer","a video isnt embeddable");
				}, // if a video isnt embeddable
				onErrorInvalidParameter: function(){
					debugWrite("tubeplayer","we've got an invalid param");
				} // if we've got an invalid param
			});
		});
		debugWrite("Инициализация tubeplayer","end");
	
		debugWrite("Инициализация iframeplayer","start");
		page.find(".iframeplayer").each(function(i,e) {
			var playerid = $(e).attr("id");
			playerActivated[playerid] = !isMobileSafari();
			playerReadyDeferred[playerid] = $.Deferred();
			var player = new YT.Player(playerid, {
				width: "100%",
				height: '648',
				allowfullscreen: 'true',
				videoId: $(e).attr("videoId"),
				events: {
					'onReady': onPlayerReady,
					'onStateChange': onPlayerStateChange,
					'onError': onPlayerError
				}
			});
			YtPlayers[page.attr("id")] = player;
			debugWrite("new YT.Player",$(e).attr("videoId"));
		});
		debugWrite("Инициализация iframeplayer","end");
	
		debugWrite("Инициализация jsplayer","start");
		page.find(".jsplayer").each(function(i,e) {
			var playerid = "jsplayer-"+$(e).parent().attr("id");
			var params = { allowScriptAccess: "always" };
			var atts = { id: playerid };
			playerActivated[playerid] = !isMobileSafari();
			playerReadyDeferred[playerid] = $.Deferred();
			swfobject.embedSWF("http://www.youtube.com/v/"+$(this).attr("videoId")+"?enablejsapi=1&playerapiid="+playerid+"&version=3",$(e).attr("id"), "100%", "648", "8", null, null, params, atts);
			debugWrite("embedSWF",$(e).attr("videoId"));
		});
		debugWrite("Инициализация jsplayer","end");
	}
	
	// Создание видео-страницы на указанном языке
	function createVideoPage(lang, pageId) {
		debugWrite("createVideoPage","start");
		debugWrite("pageId",pageId);
		debugWrite("lang",lang);
		var page = $(".video-page-template").clone();
		page.appendTo($("#center-vertical")).removeClass("video-page-template").addClass("video-page");
		page.attr("id",pageId+"-"+lang);
		page.addClass(pageId);
		page.addClass(lang);
		
		// В зависимости от способа воспроизведения видео
		// создаём либо div элемент для tubeplayer,
		// либо html5 video таг
		if(!isKioskPro()) {
			var player = "<div id='player-"+page.attr("id")+"' videoId='"+videos[lang][pageId].videoId+"' class='"+PlayerApi+"'></div>";
			page.append(player);
			debugWrite(PlayerApi,player);		
		} else {
			var player_id = "player-"+page.attr("id");
			var video = "<video id='"+player_id+"' width='1024px' height='648px' controls>";
			videos[lang][pageId].sources.forEach(function(value,index) {
				video += "<source src='"+value.src+"' type='"+value.type+"'>";
			});
			video += "This browser does not support HTML5 video";
			video += "</video>";
			var srt = "<div class='srt' data-video='"+player_id+"' >"+videos[lang][pageId].srt.text+"</div>";
			page.append(video);
			page.append(srt);
			debugWrite("video",video);
			debugWrite("video",srt);
		}
		
		// Добавляем кнопки, отображаемые на странице видео при остановке вопроизведения видео
		for(var btn in videoButtons[lang]) {
			var lnk = "<a class='"+btn+" "+videoButtons[lang][btn].buttonClass+"' href='#'><div class='"+btn+"-icon'></div>"+videoButtons[lang][btn].text+"</a>";
			page.append(lnk)
			debugWrite("lnk",lnk);
		}
		
		var tip = $(".videoTip",page);
		tip.html(tip.html()+"<img src='images/up-arrow.png' />");
		
		// Выбор способа воспроизведения видео
		// Для KioskPro, используется HTML5 video 
		// Для остальных случаев воспроизводим с YouTube
		debugWrite("Выбор способа воспроизведения видео","start");
		if(!isKioskPro()) {
			page.find("video").remove();
		} else {
			page.find(".tubeplayer,.iframeplayer,.jsplayer").remove();
		}
		debugWrite("Выбор способа воспроизведения видео","end");
	
		debugWrite("Инициализация html5 video","start");
		page.find("video").each(function(i,e) {
			var player = e;
			var playerid = $(e).attr("id");
			var srt = $('.srt',page);
			$(player).data("page",page);
  			setSubtitles(srt);
			playerActivated[playerid] = !isMobileSafari();
			player.addEventListener("ended", function(e){
				var page = $(this).data("page");
				var srt = $('.srt',page);
				hideCurrentVideoMenu();
				hideCurrentVideo();
				hideBuffering();
				currentIndex = nextIndex(currentIndex);
				showCurrentMenu();
				pauseSubtitles(srt);
			}, false);
			player.addEventListener("playing", function(e){
				var page = $(this).data("page");
				var srt = $('.srt',page);
				activateCurrentPlayer();
				hideBuffering();
				hideCurrentVideoMenu();
				showCurrentVideo();
				hideCurrentMenu();
 				playSubtitles(srt);
			}, false);
			player.addEventListener("pause", function(e){
				var page = $(this).data("page");
				var srt = $('.srt',page);
				showCurrentVideoMenu();
				pauseSubtitles(srt);
			}, false);
			player.addEventListener("waiting", function(e){
				showBuffering();
			}, false);
			player.addEventListener("error", function(e){
				debugWrite("an error in playback.");
			}, false);
		});
		debugWrite("Инициализация html5 video","end");
	
		if(!isMobileSafari()) createYoutubePlayer(page);
	
		page.find(".videoStop").click(function(event) {
			if (event.preventDefault) { event.preventDefault(); } else { event.returnValue = false; }
			pauseCurrentPlayer();
			hideCurrentVideoMenu();
			hideCurrentVideo();
			showCurrentMenu();
			return false;
		});
	
		page.find(".videoHome").click(function(event) {
			if (event.preventDefault) { event.preventDefault(); } else { event.returnValue = false; }
			pauseCurrentPlayer();
			hideCurrentVideoMenu();
			hideCurrentVideo();
			currentIndex = 0;
			showCurrentMenu();
			return false;
		});
	
		page.find(".videoContact").click(function(event) {
			if (event.preventDefault) { event.preventDefault(); } else { event.returnValue = false; }
			pauseCurrentPlayer();
			hideCurrentVideoMenu();
			hideCurrentVideo();
			currentIndex = 4;
			showCurrentMenu();
			return false;
		});
	
		debugWrite("createVideoPage","end");

  function playSubtitles(subtitleElement) {
	var timer = subtitleElement.data("timer");
	timer.play();
  }
  function pauseSubtitles(subtitleElement) {
	var timer = subtitleElement.data("timer");
	timer.pause();
  }
  function stopSubtitles(subtitleElement) {
	var timer = subtitleElement.data("timer");
	timer.stop();
  }

/*
 * jQuery srt
 *
 * version 0.1 (November 28, 2008)
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
/*
  usage:
    <video src="example.ogg" id="examplevideo" />
    <div class="srt" data-video="examplevideo" data-srt="example.srt"></div>

  jquery.srt.js will try to load subtitles in all elements with 'srt' class.
  'data-video' atribute is used to link to the related video,
  if no data-srt is provided, the contents of the div is parsed as srt.
*/

  
//$(document).ready(function() {
  function toSeconds(t) {
    var s = 0.0
    if(t) {
      var p = t.split(':');
      for(i=0;i<p.length;i++)
        s = s * 60 + parseFloat(p[i].replace(',', '.'))
    }
    return s;
  }
  function strip(s) {
    return s.replace(/^\s+|\s+$/g,"");
  }
  function setSubtitles(subtitleElement) {
    var videoId = subtitleElement.attr('data-video');
    var srt = subtitleElement.text();
    subtitleElement.text('');
    srt = srt.replace(/\r\n|\r|\n/g, '\n')
    
    var subtitles = {};
    srt = strip(srt);
    var srt_ = srt.split('\n\n');
	last = -1;
    for(s in srt_) {
        st = srt_[s].split('\n');
        if(st.length >=2) {
          n = st[0];
          i = strip(st[1].split(' --> ')[0]);
          o = strip(st[1].split(' --> ')[1]);
          t = st[2];
          if(st.length > 2) {
            for(j=3; j<st.length;j++)
              t += '\n'+st[j];
          }
          is = toSeconds(i);
          os = toSeconds(o);
		  last = Math.max(parseInt(is),last+1);
          subtitles[last] = {i:i, o: o, t: t};
		  debugWrite ("#"+last,subtitles[last].i+" --> "+subtitles[last].o+" "+subtitles[last].t);
        }
    }
    var currentSubtitle = -1;
    var timer = $.timer(function() {
      var currentTime = document.getElementById(videoId).currentTime;
      var subtitle = -1;
      for(s in subtitles) {
        if(s > currentTime)
          break
        subtitle = s;
      }
      if(subtitle > 0) {
        if(subtitle != currentSubtitle) {
          subtitleElement.html(subtitles[subtitle].t);
          currentSubtitle=subtitle;
        } else if(subtitles[subtitle].o < currentTime) {
          subtitleElement.html('');
        }
      }
    });
	timer.set({ time : 100, autostart : false });
	subtitleElement.data("timer",timer);
  }
//  $('.srt',page).each(function() {
//    var subtitleElement = $(this);
//    var videoId = subtitleElement.attr('data-video');
//    if(!videoId) return;
//    var srtUrl = subtitleElement.attr('data-srt');
//    if(srtUrl) {
//      $(this).load(srtUrl, function (responseText, textStatus, req) { playSubtitles(subtitleElement)})
//	  debugWrite("load srt",$(this).text());
//    } else {
//      playSubtitles(subtitleElement);
//    }
//  });
//});
	}
	
	var oDropdowns = Array();
	function closeDropdowns() {
		for(var i=0; i<oDropdowns.length; i++) {
			oDropdowns[i].close();
		}
	}
	
	function createMenuPage(lang, pageId) {
		debugWrite("createMenuPage","start");
		debugWrite("pageId",pageId);
		debugWrite("lang",lang);
		var page = $(".menu-page-template").clone();
		page.appendTo($("#center-vertical")).removeClass("menu-page-template").addClass("menu-page").addClass(pageId);
		page.attr("id",pageId+"-"+lang);
		page.addClass(lang);
		debugWrite("form",pageForms[pageId].form);
		

			var inputs = document.getElementsByTagName("input"), span = Array(), textnode, option, active;
			for(a = 0; a < inputs.length; a++) {
				if((inputs[a].type == "checkbox" || inputs[a].type == "radio") && inputs[a].className.indexOf("styled") > -1) {
					if(!inputs[a].getAttribute("disabled") && !inputs[a].checked) {
							$(inputs[a].previousSibling).mousedown();
							$(inputs[a].previousSibling).mouseup();
					}
				}
			}
			
		debugWrite("hideDoctor","start");
		hideDoctor();
		debugWrite("hideDoctor","end");
		
		page.append(pageForms[pageId].form);
		debugWrite("Инициализация переменных","start");
		try {
			page.find("input[name*='ipad_id']").val(getID());
			page.find("input[name*='url']").val(window.location.toString());
		} catch(e) {
			debugWrite("error",e);
		}
		debugWrite("Инициализация переменных","end");
	
		debugWrite("Заполняем поля формы значениями указанными в аргументах","start");
		for(var arg in args) {
			page.find("input[name*='"+arg+"']").val(args[arg]);
		}
		debugWrite("Заполняем поля формы значениями указанными в аргументах","end");
		
		// Производим замену в строках-шаблонах значениями аргументов и добавляем полученные строки на страницу
		var titles = {};
		for(var prop in pages[lang][pageId]) titles[prop]=pages[lang][pageId][prop];
		for(var prop in titles) for(var arg in args) titles[prop] = titles[prop].split("##"+arg+"##").join(args[arg]);
		for(var prop in titles) page.find("#"+prop+"").html(titles[prop]);
		
			// Устанавливаем все элементы checkbox в состояние checked
			// Используем фрагмент из скрипта CUSTOM FORM ELEMENTS
			var inputs = page.get(0).getElementsByTagName("input"), span = Array(), textnode, option, active;
			for(a = 0; a < inputs.length; a++) {
				if((inputs[a].type == "checkbox" || inputs[a].type == "radio") && inputs[a].className.indexOf("styled") > -1) {
					span[a] = document.createElement("span");
					span[a].className = inputs[a].type;
	
					if(inputs[a].checked == true) {
						if(inputs[a].type == "checkbox") {
							position = "0 -" + (checkboxHeight*2) + "px";
							span[a].style.backgroundPosition = position;
						} else {
							position = "0 -" + (radioHeight*2) + "px";
							span[a].style.backgroundPosition = position;
						}
					}
					inputs[a].parentNode.insertBefore(span[a], inputs[a]);
				}
			}
	
			// Используем фрагмент из скрипта CUSTOM FORM ELEMENTS
			var inputs = page.get(0).getElementsByTagName("input");
			for(a = 0; a < inputs.length; a++) {
				if((inputs[a].type == "checkbox" || inputs[a].type == "radio") && inputs[a].className.indexOf("styled") > -1) {
					if(!inputs[a].getAttribute("disabled")) {
						$(inputs[a].previousSibling).mousedown(Custom.pushed);
						$(inputs[a].previousSibling).mouseup(Custom.check);
						$(inputs[a].previousSibling).mouseup(function() {
							var item = this.nextSibling;
							$("input[name='"+$(item).attr("name")+"']").each(function(index,element) {
								element.checked=item.checked;
							});
						});
						$(inputs[a].previousSibling).mouseup(Custom.clear);
						$(inputs[a]).change(function() {
							var item = this;
							$("input[name='"+$(item).attr("name")+"']").each(function(index,element) {
								element.checked=item.checked;
							});
						});
						$(inputs[a]).change(Custom.clear);
					}
				}
			}
	
		// Перевод заголовков полей формы на указанный язык
		for(var lblFor in formLabels[lang]) {
			page.find("label[for='"+lblFor+"']").text(formLabels[lang][lblFor]);
		}
		
		// Добавление кнопок
		// Добавляются все кнопки.
		// Не используемые кнопки отключаются в CSS файле.
		for(var btn in menuButtons[lang]) {
			var lnk = "<a class='"+btn+" "+menuButtons[lang][btn].buttonClass+"' href='#'><div class='"+btn+"-icon'></div>"+menuButtons[lang][btn].text+"</a>";
			page.append(lnk);
			debugWrite("lnk",lnk);
		}
	
		// Добавление выбора языка
		var languageSelector = "<div class='languageSelector'><select id='languageSelector-"+lang+"-"+pageId+"' name='languageSelector' style='width:180px'>";
		for(var lng in languages) {
			var selected = (lng==lang)?"selected":"";
			var option = "<option "+selected+" value='"+lng+"' data-image='intl/flag-"+lng+".png'>"+languages[lng]+"</option>";
			languageSelector += option;
		}
		languageSelector += "</select></div>";
		page.append(languageSelector);
		
		// Создание выпадающего списка языков на основе созданного select
		// Письмо от 02.08.2013:
		// При запросе фамилии доктора, нужно сделать так, что если человек может на заднем фоне поменять язык, 
		// то и запрос по доктору будет на его родном языке
		var oDropdown = $("#languageSelector-"+lang+"-"+pageId+"",page).msDropdown({rowHeight:32}).data("dd");
		oDropdown.visibleRows(languages.length);
		oDropdowns.push(oDropdown);
		oDropdown.on("change", function(event) {
			debugWrite("this.value",this.value);
			if(showSurvey) { 
				hideSurveyDialog();
			}
			if(showRules) { 
				hideRulesDialog();
			}
			hideCurrentMenu();
			currentLanguage = this.value;
			for(var i=0; i<oDropdowns.length; i++) {
				oDropdowns[i].setIndexByValue(currentLanguage);
			}
			closeDropdowns();
			createPagesIfNotExists(currentLanguage);
			showCurrentMenu();
			if(showSurvey) { 
				showSurveyDialog(); 
			}
			if(showRules) { 
				showRulesDialog(); 
			}
		});
		
		// Проверка встроенной поддержки для <input type="date">
		// Если нет встроенной поддержки для <input type="date">,
		// то заменяем <input type="date"> на <input type="text">
		debugWrite("Проверка встроенной поддержки для <input type='date'>","start");
		if (!Modernizr.inputtypes.date) {
			try {
				page.find("input[type='date']").attr("type","text");
			} catch (e) {
				debugWrite('page.find("input[type=\'date\']").attr("type","text") error',e);
			}
		}
		debugWrite("Проверка встроенной поддержки для <input type='date'>","end");
		
		// Обработка поля due_date если нет встроенной поддержки для <input type="date">
		debugWrite("Обработка поля due_date если нет встроенной поддержки для <input type='date'>","start");
		page.find("input[name*='due_date'][type='text']").data("lang",lang);
		page.find("input[name*='due_date'][type='text']").focus(function(event) { 
			var lang = $(this).data("lang");
			$(this).datepicker( 
				"dialog", 
				$("."+currentLanguage+" input[name*='due_date']").val() , 
				function (date, inst) {
					$("input[name*='due_date']").val(date);
				},
				$.extend({
					showButtonPanel: true
				}, $.datepicker.regional[ lang ] )
			);
		});
		debugWrite("Обработка поля due_date если нет встроенной поддержки для <input type='date'>","end");
	
		debugWrite("Установка маски ввода (999) 999-9999","start");
		try {
			page.find("input[name*='phone']").mask("(999) 999-9999");
		} catch (e) {
			debugWrite('page.find("input[name*=\'phone\']").mask("(999) 999-9999") error',e);
		}
		debugWrite("Установка маски ввода (999) 999-9999","end");
	
		debugWrite("Установка валидации форм","start");
		try {
			page.find("form").validate();
		} catch (e) {
			debugWrite('page.find("form").validate() error',e);
		}
		debugWrite("Установка валидации форм","end");
	
		if(page.find("input#sweepstakes").length) $(".skip").toggle(!page.find("input#sweepstakes").get(0).checked);
		
		page.find("label").click(function() {
			if (event.preventDefault) { event.preventDefault(); } else { event.returnValue = false; }
			$("input[name='"+$(this).attr("for")+"']").each(function(index,element) {
				element.checked = !element.checked;
			});
			Custom.clear();
			$(".skip").toggle(!$("input#sweepstakes").get(0).checked);
			return false;
		});
		// Синхронизация полей ввода форм на различных языках
		page.find("input").change(function(event) {
			$("input[name='"+$(this).attr("name")+"']").val($(this).val());
		});
		
		page.find("span.checkbox").mouseup(function(event) {
			debugWrite("sweepstakes","mouseup");
			$(".skip").toggle(!$("input#sweepstakes").get(0).checked);
		});
		
		page.find(".save").click(function(event) {
			if (event.preventDefault) { event.preventDefault(); } else { event.returnValue = false; }
			closeDropdowns();
			var isValid = false;
			debugWrite("Валидация формы обратной связи","start");
			try {
				if(isKioskPro()) throw "kioskpro";
				var form = currentCallbackForm();
				debugWrite('form',form.html());
				isValid = form.valid();
			} catch (e) {
				debugWrite('form.valid() error',e);
				debugWrite("Ручная валидация формы обратной связи","start");
				$("input").removeClass("error");
				$(".error").remove();
				$(".ErrorLabel").remove();
				$(".EditingFormErrorLabel").remove();
				isValid = true;
				var form = currentCallbackForm();
				form.find("input.required").each(function(index, element) {
					debugWrite("Валидация элемента",element.getAttribute("name"));
					if(!element.value) {
						debugWrite("Элемент не валидный",element);
						isValid = false;
						debugWrite("Добавление сообщения об ошибке","start");
						//$(element).addClass("error");
						var error = document.createElement("label");
						error.setAttribute("for",element.getAttribute("name"));
						error.className = 'error';
						element.parentNode.appendChild(error);
						debugWrite("Добавление сообщения об ошибке","end");
					}
				});
				debugWrite("Ручная валидация формы обратной связи","end");
			}
			debugWrite("Валидация формы обратной связи","end");
			if (isValid) {
				debugWrite("Отправка формы обратной связи","start");
				try {
					var form = currentCallbackForm();
					form.ajaxSubmit({
						timeout:   3000,
						dataFilter: function( data, type ) {
							debugWrite("data:",data);
							debugWrite("type:",type);
						},
						success:    function() { 
							hideCurrentMenu();
							currentIndex = 1;
							clearForm();
							showCurrentMenu();
						},
						beforeSend:		function(xhr, settings) {
							debugWrite("xhr:",xhr);
							debugWrite("settings:",settings);
						},
						error:		function(xhr, textStatus, thrownError) {
							// Here's where you handle an error response.
							// Note that if the error was due to a CORS issue,
							// this function will still fire, but there won't be any additional
							// information about the error.
							debugWrite("#callbackForm","Error to send form");
							debugWrite("xhr:",xhr);
							debugWrite("textStatus:",textStatus);
							debugWrite("thrownError:",thrownError);
							debugWrite("Ручная отправка кросс-доменной формы обратной связи","start");
							crossDomainSubmit(currentCallbackForm());
							debugWrite("Ручная отправка кросс-доменной формы обратной связи","end");
							
							hideCurrentMenu();
							currentIndex = 1;
							clearForm();
							showCurrentMenu();
						}
					});
				} catch (e) {
					debugWrite('currentCallbackForm().ajaxSubmit error',e);
					debugWrite("Ручная отправка кросс-доменной формы обратной связи Попытка №2","start");
					try {
						crossDomainSubmit(currentCallbackForm());
					} catch(e) {
						debugWrite("crossDomainSubmit error",e);
					}
					debugWrite("Ручная отправка кросс-доменной формы обратной связи Попытка №2","end");
					
					hideCurrentMenu();
					currentIndex = 1;
					clearForm();
					showCurrentMenu();
				}
				debugWrite("Отправка формы обратной связи","end");
			}
			return false;
		});
				
		page.find(".rules").click(function(event) {
			if (event.preventDefault) { event.preventDefault(); } else { event.returnValue = false; }
			closeDropdowns();
			showRulesDialog();
			return false;
		});
	
		page.find(".skip").click(function(event) {
			if (event.preventDefault) { event.preventDefault(); } else { event.returnValue = false; }
			closeDropdowns();
			hideCurrentMenu();
			currentIndex = nextIndex(currentIndex);
			clearForm();
			showCurrentMenu();
			return false;
		});
	
		page.find(".save").dblclick(function(event) {
			if (event.preventDefault) { event.preventDefault(); } else { event.returnValue = false; }
			closeDropdowns();
			hideCurrentMenu();
			currentIndex = nextIndex(currentIndex);
			clearForm();
			showCurrentMenu();
			return false;
		});
	
		page.find(".next").click(function(event) {
			if (event.preventDefault) { event.preventDefault(); } else { event.returnValue = false; }
			closeDropdowns();
			hideCurrentMenu();
			currentIndex = nextIndex(currentIndex);
			clearForm();
			showCurrentMenu();
			return false;
		});
	
		page.find(".prev").click(function(event) {
			if (event.preventDefault) { event.preventDefault(); } else { event.returnValue = false; }
			closeDropdowns();
			hideCurrentMenu();
			currentIndex = prevIndex(currentIndex);
			clearForm();
			showCurrentMenu();
			return false;
		});
	
		page.find(".play").click(function(event) {
			if (event.preventDefault) { event.preventDefault(); } else { event.returnValue = false; }
			closeDropdowns();
	//		showBuffering();
			hideCurrentMenu();
			showCurrentVideoMenu();
			showCurrentVideo();
			playCurrentPlayer();
			return false;
		});
	
		page.find(".replay").click(function(event) {
			if (event.preventDefault) { event.preventDefault(); } else { event.returnValue = false; }
			closeDropdowns();
			hideCurrentMenu();
	//		showBuffering();
			currentIndex = prevIndex(currentIndex);
			showCurrentVideoMenu();
			showCurrentVideo();
			playCurrentPlayer();
			return false;
		});
	
		page.find(".home").click(function(event) {
			if (event.preventDefault) { event.preventDefault(); } else { event.returnValue = false; }
			closeDropdowns();
			hideCurrentMenu();
			currentIndex = 0;
			showCurrentMenu();
			return false;
		});
	
		page.find(".logo").click(function(event) {
			if (event.preventDefault) { event.preventDefault(); } else { event.returnValue = false; }
			closeDropdowns();
			hideCurrentMenu();
			currentIndex = 0;
			showCurrentMenu();
			return false;
		});
	
		page.find(".logo").dblclick(function(event) {
			if (event.preventDefault) { event.preventDefault(); } else { event.returnValue = false; }
			openCryoCell();
			return false;
		});
	
		page.find(".contact").click(function(event) {
			if (event.preventDefault) { event.preventDefault(); } else { event.returnValue = false; }
			closeDropdowns();
			hideCurrentMenu();
			currentIndex = 4;
			showCurrentMenu();
			return false;
		});
		
		page.find("select#languageSelector").change(function(event) {
			if (event.preventDefault) { event.preventDefault(); } else { event.returnValue = false; }
			closeDropdowns();
			hideCurrentMenu();
			currentLanguage = $(this).val();
			$("select#languageSelector").val(currentLanguage);
			createPagesIfNotExists(currentLanguage);
			showCurrentMenu();
			return false;
		});
	
		debugWrite("createMenuPage","end");
	}
	
	function createPagesIfNotExists(lang) {
		debugWrite("createPagesIfNotExists","start");
		debugWrite("lang",lang);
		if ($(".video-page."+lang).length==0) {
			// Создание видео-страниц
			debugWrite("Создание видео-страниц","start");
			for(var pageId in videos[lang]) {
				createVideoPage(lang, pageId);
			}
			debugWrite("Создание видео-страниц","end");
		}
		
		if ($(".menu-page."+lang).length==0) {
			// Создание страниц меню
			debugWrite("Создание страниц меню","start");
			for(var pageId in pages[lang]) {
				createMenuPage(lang, pageId);
			}
			debugWrite("Создание страниц меню","end");
		}
	
		if ($("#surveyForm."+lang).length==0) {
			// Создание страниц меню
			debugWrite("Создание диалога вопроса","start");
			createSurveyForm(lang);
			debugWrite("Создание диалога вопроса","end");
		}
		
		if ($("#rulesForm."+lang).length==0) {
			// Создание страниц меню
			debugWrite("Создание диалога правил","start");
			createRulesForm(lang);
			debugWrite("Создание диалога правил","end");
		}
	
		debugWrite("Выключение отображения элементов","start");
		try {
			$(".videoStop").hide();
			$(".videoContact").hide();
			$(".videoHome").hide();
			$(".video-page").hide();
			$(".menu-page").hide();
		} catch (e) {
			debugWrite('error',e);
		}
		debugWrite("Выключение отображения элементов","end");
		
		debugWrite("createPagesIfNotExists","end");
	}
	
	function sleep(milliseconds) {
	  var start = new Date().getTime();
	  for (var i = 0; i < 1e7; i++) {
	    if ((new Date().getTime() - start) > milliseconds){
	      break;
	    }
	  }
	}

	$(window).one('load',function(e) {
		debugWrite('load', 'start');
//		sleep(2000);
		
		// Переадресация на мобильную версию
		debugWrite("Переадресация на мобильную версию","start");
		if($.browser.mobile && !isCordova() && !isKioskPro()) {
			window.location.hostname = "m.safeguardingstemcells.com";
		}
		debugWrite("Переадресация на мобильную версию","end");
		
//		if(!isCordova() && !isKioskPro()) {
//			$('head').append('<meta name="viewport" content="width=1280" />');
//		}
		
	
		// Использование языка браузера в качестве начального языка страниц
		debugWrite("Использование языка браузера в качестве начального языка страниц","start");
		var userLang = navigator.language || navigator.userLanguage; 
		userLang = userLang.substr(0,2);
		debugWrite("The language is: ",userLang);
		if (languages[userLang]) {
			currentLanguage = userLang;
		}
		debugWrite("Использование языка браузера в качестве начального языка страниц","end");
	 
		debugWrite("Выключение отображения элементов","start");
		try {
			hideBuffering();
			hideSurveyDialog();
			hideRulesDialog();
		} catch (e) {
			debugWrite('error',e);
		}
		debugWrite("Выключение отображения элементов","end");
		
		debugWrite("hideDoctor","start");
		hideDoctor();
		debugWrite("hideDoctor","end");
		
		domReadyDeferred.resolve();
	
		if (!isCordova())  {
			deviceReadyDeferred.resolve();
			languageReadyDeferred.resolve();
		}
		
		if(!isKioskPro() && PlayerApi == "iframeplayer") {
		// Инициализация для YouTube Player API
			debugWrite("Инициализация YouTube Player API","start");
			// Load the IFrame Player API code asynchronously.
			var tag = document.createElement('script');
			tag.src = "https://www.youtube.com/iframe_api";
			var firstScriptTag = document.getElementsByTagName('script')[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
			debugWrite("Инициализация YouTube Player API","end");
		} else {
			iframePlayerAPIReadyDeferred.resolve();
		}
		
		debugWrite('load', 'end');
	});
	
	// Wait for Cordova to load
	//
	document.addEventListener("deviceready", onDeviceReady, false);
	
	// Cordova is ready
	//
	function onDeviceReady() {
		debugWrite("onDeviceReady","start");
		deviceReadyDeferred.resolve();
	
		try {
			navigator.globalization.getLocaleName(
				function(locale) { 
					if(languages[locale.value.substr(0,2)]) currentLanguage = locale.value.substr(0,2); 
					languageReadyDeferred.resolve();
				},
				function() {
					languageReadyDeferred.resolve();
				}
			)
		} catch(e) {
			languageReadyDeferred.resolve();
		}
		
		debugWrite("onDeviceReady","end");
	}
	
	$.when(deviceReadyDeferred, domReadyDeferred, languageReadyDeferred, iframePlayerAPIReadyDeferred).then(function() {
		debugWrite('when(deviceReadyDeferred, domReadyDeferred, languageReadyDeferred, iframePlayerAPIReadyDeferred).then','start');
	
		// Разбор строки запроса на элементы
		debugWrite("Разбор строки запроса на элементы","start");
		try {
			url = $.url(window.location.toString());
		} catch (e) {
			debugWrite("$.url error",e);
		}
		debugWrite("Разбор строки запроса на элементы","end");
		
			
		debugWrite("Заполняем аргументы значениями переданными в параметрах","start");
		try {
			url.attr("query").split("&").forEach(function (value,index) {
				var ar = value.split("=");
				debugWrite(ar[0],ar[1]);
				args[ar[0]]=urldecode(ar[1]);
			});
		} catch (e) {
			debugWrite('url.attr("query").split("&").forEach error',e);
		}
		debugWrite("Заполняем аргументы значениями переданными в параметрах","end");
	
		debugWrite("Заполняем аргументы значениями указанными в iPadID","start");
		try {
			if(isKioskPro()) {
				var iPadID = localStorage.getItem("KioskProID");
				if (iPadID && iPadID != "") {
					iPadID.split("&").forEach(function (value,index) {
						var ar = value.split("=");
						debugWrite(ar[0],ar[1]);
						args[ar[0]]=urldecode(ar[1]);
					});
				}
			}
		} catch (e) {
			debugWrite('getID().split("&").forEach error',e);
		}
		debugWrite("Заполняем аргументы значениями указанными в iPadID","end");
		
		// Создание страниц для текущего языка
		debugWrite("Создание страниц для текущего языка","start");
		createPagesIfNotExists(currentLanguage);
		debugWrite("Создание страниц для текущего языка","end");
			
		debugWrite("Инициализация переменных","start");
		try {
			$("input[name*='ipad_id']").val(getID());
			$("input[name*='url']").val(window.location.toString());
		} catch(e) {
			debugWrite("error",e);
		}
		debugWrite("Инициализация переменных","end");
	
		debugWrite("Заполняем поля формы значениями указанными в аргументах","start");
		for(var arg in args) {
			$("input[name*='"+arg+"']").val(args[arg]);
		}
		debugWrite("Заполняем поля формы значениями указанными в аргументах","end");
	
		debugWrite("Изменение размера элементов под размер экрана","start");
		try {
			updateHeight();
		} catch (e) {
			debugWrite('updateHeight error',e);
		}
		$(window).resize(function() {
			updateHeight();
		});
		debugWrite("Изменение размера элементов под размер экрана","end");
		
		debugWrite("Отображение текущего меню","start");
		showCurrentMenu();
		debugWrite("Отображение текущего меню","end");
	
//		debugWrite("Попытка включения полноэкранного режима","start");
//		try {
//			fullScreen();
//		} catch (e) {
//			debugWrite('fullScreen error',e);
//		}
//		debugWrite("Попытка включения полноэкранного режима","end");
		
	/*
		// Открытие формы вопроса перед началом использования сайта
		// Условие - либо нет iPadID, либо в строке адреса нет параметров
		debugWrite("Проверка и открытие формы вопроса","start");
		try {
			if((!isKioskPro()) && !(url && (url.attr("query") || url.attr("fragment")))) {
				showSurveyDialog();
			}
		} catch (e) {
			debugWrite('error',e);
		}
		debugWrite("Проверка и открытие формы вопроса","end");
	*/
		
		debugWrite('when(deviceReadyDeferred, domReadyDeferred, languageReadyDeferred, iframePlayerAPIReadyDeferred).then','end');
	});
})(jQuery);
