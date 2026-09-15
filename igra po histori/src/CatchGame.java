import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.util.ArrayList;
import java.util.Random;

public class CatchGame extends JPanel implements ActionListener {
    private static final int WIDTH = 800;
    private static final int HEIGHT = 600;
    private static final int PLAYER_SIZE = 40;
    private static final int OBJECT_SIZE = 30;
    private static final int SPEED = 5;

    private int playerX;
    private int playerY;
    private boolean leftPressed, rightPressed;

    private ArrayList<Rectangle> objects = new ArrayList<>();
    private Random random = new Random();
    private Timer timer;
    private int score = 0;

    public CatchGame() {
        setBackground(Color.BLACK);
        playerX = WIDTH / 2 - PLAYER_SIZE / 2;
        playerY = HEIGHT - PLAYER_SIZE - 10;

        KeyAdapter keyAdapter = new KeyAdapter() {
            @Override
            public void keyPressed(KeyEvent e) {
                if (e.getKeyCode() == KeyEvent.VK_LEFT) leftPressed = true;
                if (e.getKeyCode() == KeyEvent.VK_RIGHT) rightPressed = true;
            }
            @Override
            public void keyReleased(KeyEvent e) {
                if (e.getKeyCode() == KeyEvent.VK_LEFT) leftPressed = false;
                if (e.getKeyCode() == KeyEvent.VK_RIGHT) rightPressed = false;
            }
        };
        addKeyListener(keyAdapter);
        setFocusable(true);

        timer = new Timer(16, this); // ~60 FPS
        timer.start();
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        // Движение игрока
        if (leftPressed && playerX > 0) playerX -= SPEED;
        if (rightPressed && playerX < WIDTH - PLAYER_SIZE) playerX += SPEED;

        // Добавление новых объектов
        if (random.nextInt(100) < 5) {
            int x = random.nextInt(WIDTH - OBJECT_SIZE);
            objects.add(new Rectangle(x, -OBJECT_SIZE, OBJECT_SIZE, OBJECT_SIZE));
        }

        // Движение объектов вниз
        for (int i = objects.size() - 1; i >= 0; i--) {
            Rectangle obj = objects.get(i);
            obj.y += 5;
            if (obj.y > HEIGHT) {
                objects.remove(i);
                score++;
            }
        }

        // Проверка столкновений
        Rectangle playerRect = new Rectangle(playerX, playerY, PLAYER_SIZE, PLAYER_SIZE);
        for (Rectangle obj : objects) {
            if (playerRect.intersects(obj)) {
                timer.stop();
                JOptionPane.showMessageDialog(null, "Игра окончена! Счёт: " + score);
                return;
            }
        }

        repaint();
    }

    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);
        Graphics2D g2d = (Graphics2D) g;
        g2d.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);

        // Игрок
        g2d.setColor(Color.GREEN);
        g2d.fillRect(playerX, playerY, PLAYER_SIZE, PLAYER_SIZE);

        // Объекты
        g2d.setColor(Color.RED);
        for (Rectangle obj : objects) {
            g2d.fillRect(obj.x, obj.y, obj.width, obj.height);
        }

        // Счёт
        g2d.setColor(Color.WHITE);
        g2d.drawString("Счёт: " + score, 20, 30);
    }

    public static void main(String[] args) {
        JFrame frame = new JFrame("Простая игра на Java");
        CatchGame game = new CatchGame();
        frame.add(game);
        frame.setSize(WIDTH, HEIGHT);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setLocationRelativeTo(null);
        frame.setVisible(true);
    }
}
