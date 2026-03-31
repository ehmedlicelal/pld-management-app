// server/routes/sessions.js
const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');
const authMiddleware = require('../utils/authMiddleware');
const { requireRole, requireSessionMentorOwner } = require('../utils/authzMiddleware');

router.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   name: Sessions
 *   description: Session operations
 */

/**
 * @swagger
 * /api/sessions:
 *   post:
 *     summary: Create session
 *     tags: [Sessions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 */
router.post('/', requireRole('mentor'), sessionController.createSession);

/**
 * @swagger
 * /api/sessions:
 *   get:
 *     summary: Get my sessions
 *     tags: [Sessions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/', sessionController.getMySessions);

/**
 * @swagger
 * /api/sessions/joinable:
 *   get:
 *     summary: Get joinable sessions
 *     tags: [Sessions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/joinable', sessionController.getJoinableSessions);

/**
 * @swagger
 * /api/sessions/{id}/join:
 *   post:
 *     summary: Join a session
 *     tags: [Sessions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.post('/:id/join', sessionController.joinSession);

/**
 * @swagger
 * /api/sessions/{id}/students:
 *   post:
 *     summary: Add student to session
 *     tags: [Sessions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.post('/:id/students', requireSessionMentorOwner, sessionController.addStudent);

/**
 * @swagger
 * /api/sessions/{id}:
 *   get:
 *     summary: Get session details
 *     tags: [Sessions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/:id', sessionController.getSession);

/**
 * @swagger
 * /api/sessions/{id}:
 *   put:
 *     summary: Update session details
 *     tags: [Sessions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.put('/:id', requireSessionMentorOwner, sessionController.updateSession);

/**
 * @swagger
 * /api/sessions/{sessionId}/students/{studentId}:
 *   delete:
 *     summary: Remove student from session
 *     tags: [Sessions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.delete('/:sessionId/students/:studentId', sessionController.removeStudent);

/**
 * @swagger
 * /api/sessions/{sessionId}/students/{studentId}/notes:
 *   put:
 *     summary: Update student notes
 *     tags: [Sessions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.put('/:sessionId/students/:studentId/notes', requireSessionMentorOwner, sessionController.updateNote);

/**
 * @swagger
 * /api/sessions/{sessionId}/students/{studentId}/result:
 *   put:
 *     summary: Save student result
 *     tags: [Sessions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.put('/:sessionId/students/:studentId/result', requireSessionMentorOwner, sessionController.saveResult);

/**
 * @swagger
 * /api/sessions/{sessionId}/students/{studentId}/grade:
 *   put:
 *     summary: Update student grade
 *     tags: [Sessions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.put('/:sessionId/students/:studentId/grade', requireSessionMentorOwner, sessionController.updateGrade);

/**
 * @swagger
 * /api/sessions/{sessionId}/students/{studentId}/questions:
 *   put:
 *     summary: Update student questions
 *     tags: [Sessions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.put('/:sessionId/students/:studentId/questions', requireSessionMentorOwner, sessionController.updateQuestions);

/**
 * @swagger
 * /api/sessions/{sessionId}/students/{studentId}/status:
 *   put:
 *     summary: Toggle student status
 *     tags: [Sessions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.put('/:sessionId/students/:studentId/status', requireSessionMentorOwner, sessionController.toggleStatus);

/**
 * @swagger
 * /api/sessions/{sessionId}/students/{studentId}/send:
 *   post:
 *     summary: Send feedback to student
 *     tags: [Sessions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.post('/:sessionId/students/:studentId/send', requireSessionMentorOwner, sessionController.sendFeedback);

/**
 * @swagger
 * /api/sessions/{sessionId}/send-all:
 *   post:
 *     summary: Send all feedback
 *     tags: [Sessions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.post('/:sessionId/send-all', requireSessionMentorOwner, sessionController.sendAllFeedback);

/**
 * @swagger
 * /api/sessions/all:
 *   delete:
 *     summary: Delete all sessions
 *     tags: [Sessions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 */
router.delete('/all', requireRole('mentor'), sessionController.deleteAllSessions);

/**
 * @swagger
 * /api/sessions/{id}:
 *   delete:
 *     summary: Delete a session
 *     tags: [Sessions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.delete('/:id', requireSessionMentorOwner, sessionController.deleteSession);

/**
 * @swagger
 * /api/sessions/{id}/end:
 *   post:
 *     summary: End a session
 *     tags: [Sessions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.post('/:id/end', requireSessionMentorOwner, sessionController.endSession);

/**
 * @swagger
 * /api/sessions/{sessionId}/students/{studentId}/submit-code:
 *   post:
 *     summary: Submit code
 *     tags: [Sessions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.post('/:sessionId/students/:studentId/submit-code', sessionController.submitCode);

/**
 * @swagger
 * /api/sessions/{sessionId}/students/{studentId}/permission:
 *   post:
 *     summary: Toggle workshop permission
 *     tags: [Sessions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.post('/:sessionId/students/:studentId/permission', requireSessionMentorOwner, sessionController.toggleStudentWorkshopPermission);

/**
 * @swagger
 * /api/sessions/stats/leaderboard:
 *   get:
 *     summary: Get leaderboard
 *     tags: [Sessions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/stats/leaderboard', sessionController.getLeaderboard);

/**
 * @swagger
 * /api/sessions/{id}/workshop-code:
 *   put:
 *     summary: Update workshop code
 *     tags: [Sessions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.put('/:id/workshop-code', sessionController.updateWorkshopCode);

module.exports = router;
